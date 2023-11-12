"use server";
import Ajv from "ajv";
import { fastUri } from "fast-uri";
import { cookies } from "next/headers";
import { env } from "node:process";
import { Client } from "portaleargo-api";

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

export const login = async (formData: FormData) => {
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
	const store = cookies();
	const client = new Client({
		debug: env.NODE_ENV === "development",
		dataProvider: {
			read: (name) => {
				const value = store.get(name)?.value;

				if (value === undefined) return undefined;
				try {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return JSON.parse(value);
				} catch (err) {
					console.error(err);
					return undefined;
				}
			},
			write: async (name, writeData) => {
				// store.set(name, JSON.stringify(writeData));
			},
			reset: async () => {
				for (const cookie of store.getAll()) store.delete(cookie.name);
			},
		},
		...data,
	});

	await client.login();
	console.log("successful login");
};
