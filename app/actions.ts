"use server";
import Ajv from "ajv";
import uriResolver from "fast-uri";
import type { Credentials } from "portaleargo-api";
import { getCode, getToken } from "portaleargo-api";

const ajv = new Ajv({
	allErrors: true,
	strictRequired: "log",
	verbose: true,
	removeAdditional: true,
	uriResolver,
});
const validateCredentials = ajv.compile<Credentials>({
	type: "object",
	properties: {
		password: { type: "string" },
		schoolCode: { type: "string" },
		username: { type: "string" },
	},
	required: ["password", "schoolCode", "username"],
});

export const getClientToken = async (formData: FormData) => {
	const credentials = {
		password: formData.get("password"),
		schoolCode: formData.get("schoolCode"),
		username: formData.get("username"),
	};

	if (!validateCredentials(credentials))
		return {
			message: "Bad request",
			error: "Il client ha inviato una richiesta malformata",
			errors: validateCredentials.errors?.map(
				(err) => `body${err.instancePath.replaceAll("/", ".")} ${err.message!}`
			),
		};
	const code = await getCode(credentials).catch(() => null);

	if (!code)
		return {
			message: "Unauthorized",
			error: "Controlla le tue credenziali di accesso",
		};
	const token = await getToken(code).catch((err) => String(err));

	if (typeof token === "string")
		return {
			message: "Unauthorized",
			error: token,
		};
	return token;
};
