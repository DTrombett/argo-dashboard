"use server";
import Ajv from "ajv";
import { fastUri } from "fast-uri";
import { env } from "node:process";
import { Client } from "portaleargo-api";

type LoginResponse =
	| {
			message: string;
			errors?: string[];
	  }
	| string
	| null;

const ajv = new Ajv({
	allErrors: true,
	strictRequired: "log",
	verbose: true,
	removeAdditional: true,
	uriResolver: fastUri,
});
const validate = ajv.compile<{
	schoolCode: string;
	username: string;
	password: string;
}>({
	type: "object",
	properties: {
		schoolCode: { type: "string" },
		username: { type: "string" },
		password: { type: "string" },
	},
	required: ["schoolCode", "username", "password"],
});

export const login = async (
	_currentState: LoginResponse,
	formData: FormData
): Promise<LoginResponse> => {
	const data = {
		schoolCode: formData.get("schoolCode"),
		username: formData.get("username"),
		password: formData.get("password"),
	};

	if (!validate(data))
		return {
			message: "Invalid body provided",
			errors: validate.errors?.map(
				(err) => `body${err.instancePath.replaceAll("/", ".")} ${err.message!}`
			),
		};
	let client: Client | undefined = new Client({
		debug: env.NODE_ENV === "development",
		dataProvider: null,
		...data,
	});

	client = await client.login().catch(() => undefined);
	if (!client?.token) return { message: "Login failed" };
	return client.token.accessToken;
};
