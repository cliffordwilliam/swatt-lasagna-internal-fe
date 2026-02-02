import { Box, Container, Typography } from "@mui/material";

interface Props {
	title?: string;
	message: string;
}

export function PageError({ title, message }: Props) {
	return (
		<Container
			sx={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box sx={{ textAlign: "center" }}>
				{title && (
					<Typography variant="h4" gutterBottom>
						{title}
					</Typography>
				)}
				<Typography color="error">{message}</Typography>
			</Box>
		</Container>
	);
}
