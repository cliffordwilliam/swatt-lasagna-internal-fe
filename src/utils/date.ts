export function formatDate(isoString: string): string {
	return new Date(isoString).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}
