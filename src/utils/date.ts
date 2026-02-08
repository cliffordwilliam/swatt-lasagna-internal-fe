export function formatDate(isoString: string): string {
	return new Date(isoString).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

/** Short format for charts etc. (e.g. "8 Jan"). */
export function formatDateShort(isoString: string): string {
	return new Date(isoString).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "short",
	});
}
