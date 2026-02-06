export function normalizeNameForDb(value: string): string {
	return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function normalizeSpaces(value: string): string {
	return value.trim().replace(/\s+/g, " ");
}

export function digitsOnly(value: string): string {
	return value.replace(/\D/g, "");
}

export function parseIntFromFormatted(value?: string | null): number {
	return parseInt(digitsOnly(value ?? ""), 10) || 0;
}
