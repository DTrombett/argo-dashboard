import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	// eslint-disable-next-line node/prefer-global/buffer
	const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
	const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;
	const contentSecurityPolicyHeaderValue = cspHeader
		.replace(/\s{2,}/g, " ")
		.trim();
	const headers = new Headers(request.headers);

	headers.set("x-nonce", nonce);
	headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);
	const response = NextResponse.next({ request: { headers } });

	response.headers.set(
		"Content-Security-Policy",
		contentSecurityPolicyHeaderValue
	);
	return response;
}

export const config = {
	matcher: [
		{
			source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},
	],
};
