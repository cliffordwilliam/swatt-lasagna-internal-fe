import { useEffect, useState } from "react";
import type { OrderDetail } from "../../api/orders";
import { getOrder } from "../../api/orders";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useOrder(id: string | undefined) {
	const { getAuthToken } = useAuthToken();
	const [order, setOrder] = useState<OrderDetail | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			if (!id) {
				setError("No order ID provided");
				setLoading(false);
				return;
			}
			try {
				setOrder(await getOrder(id, await getAuthToken()));
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [id, getAuthToken]);

	return { order, loading, error };
}
