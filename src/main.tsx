import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ClerkProvider } from "@clerk/clerk-react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider publishableKey="pk_test_ZmFpdGhmdWwtZ2FubmV0LTE2LmNsZXJrLmFjY291bnRzLmRldiQ">
			<CssBaseline />
			<App />
		</ClerkProvider>
	</StrictMode>,
);
