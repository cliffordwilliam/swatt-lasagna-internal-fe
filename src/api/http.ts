export async function apiFetch<T>(
	path: string,
	token: string | null,
	options: RequestInit = {},
): Promise<T> {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
		...options,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			...options.headers,
		},
	});
	if (!res.ok) {
		throw new Error(await res.text());
	}

	const contentLength = res.headers.get("content-length");
	if (contentLength === "0" || contentLength === null) {
		return undefined as T;
	}

	return res.json();
}
