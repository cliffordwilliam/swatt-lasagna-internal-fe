import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { DashboardResponse } from "../../api/dashboard";
import { getDashboard } from "../../api/dashboard";

export function useDashboard() {
	const { getToken } = useAuth();
	const [data, setData] = useState<DashboardResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				setLoading(true);
				setError(null);
				setData(await getDashboard(await getToken()));
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [getToken]);

	return { data, loading, error };
}
