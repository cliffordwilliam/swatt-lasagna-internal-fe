export function formatIDR(amount: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amount);
}

export function formatIDRShort(amount: number): string {
	if (amount >= 1_000_000) {
		const juta = amount / 1_000_000;
		return juta % 1 === 0 ? `${juta}jt` : `${juta.toFixed(1)}jt`;
	}
	if (amount >= 1_000) {
		const rb = amount / 1_000;
		return rb % 1 === 0 ? `${rb}rb` : `${rb.toFixed(1)}rb`;
	}
	return String(amount);
}
