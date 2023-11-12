"use server";
import Ajv from "ajv";
import { fastUri } from "fast-uri";
import { cookies } from "next/headers";
import { env } from "node:process";
import { Client } from "portaleargo-api";

type LoginResponse =
	| {
			message: string;
			errors?: string[];
	  }
	| string
	| undefined;

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
			message: "Il server ha ricevuto una richiesta malformata",
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
	if (!client?.token)
		return { message: "Controlla le tue credenziali d'accesso" };
	cookies().set("accessToken", client.token.accessToken);
	return client.token.accessToken;
};

export const getCookie = (name: string) => cookies().get(name)?.value;
