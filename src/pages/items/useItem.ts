import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { Item } from "../../api/items";
import { getItem } from "../../api/items";

export function useItem(id: string | undefined) {
	const { getToken } = useAuth();
	const [item, setItem] = useState<Item | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			if (!id) {
				setError("No item ID provided");
				setLoading(false);
				return;
			}

			try {
				setItem(await getItem(id, await getToken()));
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}

		load();
	}, [id, getToken]);

	return { item, loading, error };
}
