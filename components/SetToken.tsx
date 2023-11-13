"use client";
import { setCookies } from "@/app/actions";
import type { Token } from "portaleargo-api";
import { useEffect } from "react";

const SetToken = ({ token }: { token: Token | string | undefined }) => {
	useEffect(() => {
		setCookies(token);
	}, [token]);
	return <></>;
};

export default SetToken;
