import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { Item } from "../../api/items";
import { listItems } from "../../api/items";

export function useItems() {
	const { getToken } = useAuth();
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				setItems(await listItems(await getToken()));
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [getToken]);

	return { items, loading, error };
}
