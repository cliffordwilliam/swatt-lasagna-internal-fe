import { Container, Typography } from "@mui/material";

function HomePage() {
	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Home
			</Typography>
			<Typography>Welcome to the home page!</Typography>
		</Container>
	);
}

export default HomePage;
