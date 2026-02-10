import { useState } from "react";
import type { CreatePersonRequest } from "../../api/persons";
import { createPerson } from "../../api/persons";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useCreatePerson() {
	const { getAuthToken } = useAuthToken();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = async (data: CreatePersonRequest) => {
		setLoading(true);
		setError(null);
		try {
			await createPerson(data, await getAuthToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
}
