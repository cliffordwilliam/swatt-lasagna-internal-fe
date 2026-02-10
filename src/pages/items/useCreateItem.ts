import { useState } from "react";
import type { CreateItemRequest } from "../../api/items";
import { createItem } from "../../api/items";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useCreateItem() {
	const { getAuthToken } = useAuthToken();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = async (data: CreateItemRequest) => {
		setLoading(true);
		setError(null);
		try {
			await createItem(data, await getAuthToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
}
