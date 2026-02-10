import { useAuth, useClerk } from "@clerk/clerk-react";
import { useCallback } from "react";

export function useAuthToken() {
	const { getToken } = useAuth();
	const { signOut } = useClerk();

	const getAuthToken = useCallback(async (): Promise<string> => {
		const token = await getToken();
		if (!token) {
			await signOut({ redirectUrl: import.meta.env.VITE_BASE_PATH });
			throw new Error("Session expired");
		}
		return token;
	}, [getToken, signOut]);

	return { getAuthToken };
}
