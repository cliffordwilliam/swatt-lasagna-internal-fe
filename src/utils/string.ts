export function normalizeNameForDb(value: string): string {
	return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function normalizeSpaces(value: string): string {
	return value.trim().replace(/\s+/g, " ");
}
