import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import type { UpdateItemRequest } from "../../api/items";
import { updateItem } from "../../api/items";

export function useUpdateItem() {
	const { getToken } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const update = async (id: string, data: UpdateItemRequest) => {
		setLoading(true);
		setError(null);
		try {
			await updateItem(id, data, await getToken());
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setLoading(false);
		}
	};

	return { update, loading, error };
}
