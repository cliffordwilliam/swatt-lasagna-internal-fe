import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { SnackbarProvider } from "notistack";
import validateEnv from "./env";

validateEnv();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
			<CssBaseline />
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={3000}
			>
				<App />
			</SnackbarProvider>
		</ClerkProvider>
	</StrictMode>,
);
