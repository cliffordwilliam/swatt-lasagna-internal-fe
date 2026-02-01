import { Box, CircularProgress } from "@mui/material";

export function PageLoading() {
	return (
		<Box
			sx={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Box>
	);
}
