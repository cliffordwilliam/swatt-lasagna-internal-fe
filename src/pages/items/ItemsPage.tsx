import { Container, Typography } from "@mui/material";
import { useState } from "react";
import type { Item } from "../../api/items";
import { ItemActionsDrawer } from "../../components/items/ItemActionsDrawer";
import { ItemsList } from "../../components/items/ItemsList";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { useItems } from "./useItems";

function ItemsPage() {
	const { items, loading, error } = useItems();
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleActionClick = (item: Item) => {
		setSelectedItem(item);
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	const handleEdit = () => {
		if (selectedItem) {
			console.log("Edit", selectedItem);
		}
		setDrawerOpen(false);
	};

	const handleDelete = () => {
		if (selectedItem) {
			console.log("Delete", selectedItem);
		}
		setDrawerOpen(false);
	};

	if (loading) return <PageLoading />;
	if (error) {
		return <PageError title="Items" message={error} />;
	}

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Items
			</Typography>
			{items.length === 0 ? (
				<Typography>No items found.</Typography>
			) : (
				<ItemsList items={items} onActionClick={handleActionClick} />
			)}
			<ItemActionsDrawer
				open={drawerOpen}
				onClose={handleDrawerClose}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
		</Container>
	);
}

export default ItemsPage;
