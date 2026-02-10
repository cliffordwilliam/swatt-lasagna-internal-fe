import { useEffect, useState } from "react";
import type { Item } from "../../api/items";
import { listItems } from "../../api/items";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useItems() {
	const { getAuthToken } = useAuthToken();
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				setItems(await listItems(await getAuthToken()));
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [getAuthToken]);

	return { items, loading, error };
}
