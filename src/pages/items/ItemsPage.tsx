import SearchIcon from "@mui/icons-material/Search";
import {
	Container,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const handleActionClick = (item: Item) => {
		setSelectedItem(item);
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	const handleEdit = () => {
		if (selectedItem) {
			navigate(`/items/${selectedItem.id}/edit`);
		}
		setDrawerOpen(false);
	};

	const handleDelete = () => {
		if (selectedItem) {
		}
		setDrawerOpen(false);
	};

	const filteredItems = items.filter((item) =>
		item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	if (loading) return <PageLoading />;
	if (error) {
		return <PageError title="Items" message={error} />;
	}

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Items
			</Typography>

			<TextField
				id="search-items"
				placeholder="Search items"
				variant="outlined"
				fullWidth
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					},
				}}
				sx={{ mb: 3 }}
			/>

			{filteredItems.length === 0 ? (
				<Typography>No items found.</Typography>
			) : (
				<ItemsList items={filteredItems} onActionClick={handleActionClick} />
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
