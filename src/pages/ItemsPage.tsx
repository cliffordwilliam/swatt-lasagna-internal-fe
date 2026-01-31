import { useAuth } from "@clerk/clerk-react";
import { CircularProgress, Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

interface Item {
	id: number;
	name: string;
	price: number;
	created_at: string;
	updated_at: string;
}

function ItemsPage() {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { getToken } = useAuth();

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const token = await getToken();

				const response = await fetch("http://localhost:3000/api/items/", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}

				const data = await response.json();
				setItems(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch items");
			} finally {
				setLoading(false);
			}
		};

		fetchItems();
	}, [getToken]);

	if (loading) {
		return (
			<Container sx={{ py: 4, display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Container>
		);
	}

	if (error) {
		return (
			<Container sx={{ py: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Items
				</Typography>
				<Typography color="error">{error}</Typography>
			</Container>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Items
			</Typography>

			{items.length === 0 ? (
				<Typography>No items found.</Typography>
			) : (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="items table">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell align="right">Price</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{items.map((item) => (
								<TableRow
									key={item.id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{item.id}
									</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell align="right">
										${(item.price / 100).toFixed(2)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
}

export default ItemsPage;
