import type { Client } from "portaleargo-api";

export type VotoType = NonNullable<Client["dashboard"]>["voti"][number];
export type FilterName = keyof typeof filterFunctions;
export type FilterType = (typeof filterFunctions)[FilterName];
export type SortName = keyof typeof sortFunctions;

export const filterFunctions = {
	orali: [(v: VotoType) => v.codVotoPratico === "N", "codVotoPratico"],
	scritti: [(v: VotoType) => v.codVotoPratico === "S", "codVotoPratico"],
	note: [(v: VotoType) => v.codTipo === "N", "codTipo"],
	sufficienti: [(v: VotoType) => v.codTipo === "V" && v.valore >= 6, "valore"],
	insufficienti: [(v: VotoType) => v.codTipo === "V" && v.valore < 6, "valore"],
} as const;
export const filtersArray = Object.values(filterFunctions).map(([f]) => f);
export const sortFunctions: Record<
	| "Più recente"
	| "Meno recente"
	| "Ultima modifica"
	| "Voto più alto"
	| "Voto più basso",
	((a: VotoType, b: VotoType) => number) | undefined
> = {
	"Più recente": (a, b) =>
		Date.parse(a.datGiorno) > Date.parse(b.datGiorno) ? -1 : 1,
	"Meno recente": (a, b) =>
		Date.parse(a.datGiorno) > Date.parse(b.datGiorno) ? 1 : -1,
	"Ultima modifica": (a, b) =>
		Date.parse(a.datEvento) > Date.parse(b.datEvento) ? -1 : 1,
	"Voto più alto": (a, b) => b.valore - a.valore,
	"Voto più basso": (a, b) => a.valore - b.valore,
};
export const sortNames = Object.keys(sortFunctions) as SortName[];
