import { Container, Typography } from "@mui/material";

interface Props {
	title?: string;
	message: string;
}

export function PageError({ title, message }: Props) {
	return (
		<Container sx={{ py: 4 }}>
			{title && (
				<Typography variant="h4" gutterBottom>
					{title}
				</Typography>
			)}
			<Typography color="error">{message}</Typography>
		</Container>
	);
}
