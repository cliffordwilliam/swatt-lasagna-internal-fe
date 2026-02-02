/** Matches BE error-handler response shape: message (required), details (validation only) */
interface ApiErrorBody {
	message: string;
	details?: unknown;
}

export class ApiError extends Error {
	constructor(
		message: string,
		public readonly statusCode: number,
		public readonly details?: unknown,
	) {
		super(message);
		this.name = "ApiError";
	}
}

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
		const text = await res.text();
		let message = "Something went wrong";
		try {
			const body = JSON.parse(text) as ApiErrorBody;
			if (typeof body.message === "string") {
				message = body.message;
			}
			throw new ApiError(message, res.status, body.details);
		} catch (e) {
			if (e instanceof ApiError) throw e;
			throw new ApiError(message, res.status);
		}
	}

	const contentLength = res.headers.get("content-length");
	if (contentLength === "0" || contentLength === null) {
		return undefined as T;
	}

	return res.json();
}
