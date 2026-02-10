import { useEffect, useState } from "react";
import type { DashboardResponse } from "../../api/dashboard";
import { getDashboard } from "../../api/dashboard";
import { useAuthToken } from "../../hooks/useAuthToken";

export function useDashboard() {
	const { getAuthToken } = useAuthToken();
	const [data, setData] = useState<DashboardResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				setLoading(true);
				setError(null);
				setData(await getDashboard(await getAuthToken()));
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [getAuthToken]);

	return { data, loading, error };
}
