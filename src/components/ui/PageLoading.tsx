import { CircularProgress, Container } from "@mui/material";

export function PageLoading() {
	return (
		<Container
			sx={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Container>
	);
}
