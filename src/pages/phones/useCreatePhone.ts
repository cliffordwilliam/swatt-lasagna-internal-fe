import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import type { CreatePhoneRequest } from "../../api/phones";
import { createPhone } from "../../api/phones";

export function useCreatePhone() {
	const { getToken } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = async (data: CreatePhoneRequest) => {
		setLoading(true);
		setError(null);
		try {
			await createPhone(data, await getToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
}
