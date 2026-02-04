import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import type { CreatePersonRequest } from "../../api/persons";
import { createPerson } from "../../api/persons";

export function useCreatePerson() {
	const { getToken } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = async (data: CreatePersonRequest) => {
		setLoading(true);
		setError(null);
		try {
			await createPerson(data, await getToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
}
