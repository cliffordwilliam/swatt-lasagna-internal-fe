import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import type { CreateItemRequest } from "../../api/items";
import { createItem } from "../../api/items";

export function useCreateItem() {
	const { getToken } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = async (data: CreateItemRequest) => {
		setLoading(true);
		setError(null);
		try {
			await createItem(data, await getToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
}
