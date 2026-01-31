function validateEnv() {
	const required = ["VITE_CLERK_PUBLISHABLE_KEY", "VITE_API_BASE_URL"];

	for (const key of required) {
		if (!import.meta.env[key]) {
			throw new Error(`${key} is not set`);
		}
	}
}
export default validateEnv;
