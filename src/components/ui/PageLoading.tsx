import { CircularProgress, Container } from "@mui/material";

export function PageLoading() {
	return (
		<Container sx={{ py: 4, display: "flex", justifyContent: "center" }}>
			<CircularProgress />
		</Container>
	);
}
