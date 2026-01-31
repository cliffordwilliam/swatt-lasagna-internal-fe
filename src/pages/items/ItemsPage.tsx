import { CircularProgress, Container, Typography } from "@mui/material";
import { ItemsTable } from "../../components/items/ItemsTable";
import { useItems } from "./useItems";

function ItemsPage() {
	const { items, loading, error } = useItems();

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
				<Typography variant="h4">Items</Typography>
				<Typography color="error">{error}</Typography>
			</Container>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Items
			</Typography>

			{items.length === 0 ? (
				<Typography>No items found.</Typography>
			) : (
				<ItemsTable items={items} />
			)}
		</Container>
	);
}

export default ItemsPage;
