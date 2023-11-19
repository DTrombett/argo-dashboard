"use server";
import Ajv from "ajv";
import { fastUri } from "fast-uri";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "node:process";
import type { Jsonify, Token } from "portaleargo-api";
import { Client } from "portaleargo-api";

type LoginResponse =
	| {
			message: string;
			errors?: string[];
	  }
	| undefined;

const ajv = new Ajv({
	allErrors: true,
	strictRequired: "log",
	verbose: true,
	removeAdditional: true,
	uriResolver: fastUri,
});
const validateCredentials = ajv.compile<{
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
const validateToken = ajv.compile<Jsonify<Token>>({
	type: "object",
	properties: {
		expireDate: { type: "string" },
		access_token: { type: "string" },
		expires_in: { type: "integer" },
		id_token: { type: "string" },
		refresh_token: { type: "string" },
		scope: { type: "string" },
		token_type: { type: "string" },
	},
	required: [
		"expireDate",
		"access_token",
		"expires_in",
		"id_token",
		"refresh_token",
		"scope",
		"token_type",
	],
});
const clients: Partial<Record<string, Client>> = {};

const setClientCookies = (
	store: ReadonlyRequestCookies,
	token?: Token | string
) => {
	if (!token) store.delete("token");
	else
		store.set({
			httpOnly: true,
			maxAge: 2147483647,
			name: "token",
			priority: "high",
			sameSite: "strict",
			secure: true,
			value: typeof token === "string" ? token : JSON.stringify(token),
		});
};
export const getClientToken = (): Token | undefined => {
	const value = cookies().get("token")?.value;

	if (value == null) return undefined;
	let token;

	try {
		token = JSON.parse(value);
	} catch (err) {
		return undefined;
	}
	if (!validateToken(token)) return undefined;
	return { ...token, expireDate: new Date(token.expireDate) };
};
const getClient = async () => {
	const token = getClientToken();

	if (!token) return undefined;
	let client = clients[token.access_token];

	if (client) {
		if (client.isReady()) return client;
		client = await client.login().catch(() => undefined);
		if (client) return client;
		delete clients[token.access_token];
	}
	client = new Client({
		debug: env.NODE_ENV === "development",
		dataProvider: null,
	});
	client.token = token;
	return client
		.login()
		.then((c) => {
			clients[token.access_token] = c;
			return c;
		})
		.catch(() => undefined);
};
export const logOut = async () => {
	const token = getClientToken();

	cookies().delete("token");
	if (token != null) {
		await clients[token.access_token]?.rimuoviProfilo().catch(console.error);
		delete clients[token.access_token];
	}
	redirect("/");
};
export const login = async (
	_currentState: LoginResponse,
	formData: FormData
): Promise<LoginResponse> => {
	const data = {
		schoolCode: formData.get("schoolCode"),
		username: formData.get("username"),
		password: formData.get("password"),
	};

	if (!validateCredentials(data))
		return {
			message: "Il server ha ricevuto una richiesta malformata",
			errors: validateCredentials.errors?.map(
				(err) => `body${err.instancePath.replaceAll("/", ".")} ${err.message!}`
			),
		};
	let client: Client | void = new Client({
		debug: env.NODE_ENV === "development",
		dataProvider: null,
		...data,
	});

	client = await client.login().catch(console.error);
	if (!client?.token)
		return { message: "Controlla le tue credenziali d'accesso" };
	clients[client.token.access_token] = client;
	setClientCookies(cookies(), client.token);
	return redirect("/dashboard");
};
export const getDashboard = async () => {
	// return {
	// 	dashboard: JSON.parse(
	// 		await readFile(
	// 			"C:/Users/acer/Progetti/nextjs/argo-dashboard/dashboard.json",
	// 			{ encoding: "utf-8" }
	// 		)
	// 	) as Dashboard,
	// 	token: getClientToken(),
	// };
	const client = await getClient();

	// if (client)
	// 	await writeFile(
	// 		"C:/Users/acer/Progetti/nextjs/argo-dashboard/dashboard.json",
	// 		JSON.stringify(client.dashboard)
	// 	);
	return client
		? { dashboard: client.dashboard!, token: client.token! }
		: { dashboard: undefined, token: undefined };
};
export const setCookies = (token?: Token | string) => {
	setClientCookies(cookies(), token);
};
