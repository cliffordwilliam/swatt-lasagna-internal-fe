import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardHeader,
	Typography,
} from "@mui/material";
import { useState } from "react";
import type { Item } from "../../api/items";
import { formatIDR } from "../../utils/money";
import NumberSpinner from "../ui/NumberSpinner";
import { ItemSelectorDrawer } from "./ItemSelectorDrawer";

export interface CartItem {
	item: Item;
	quantity: number;
}

export interface CartItemsManagerProps {
	cartItems: CartItem[];
	onCartItemsChange: (items: CartItem[]) => void;
}

export function CartItemsManager({
	cartItems,
	onCartItemsChange,
}: CartItemsManagerProps) {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleAddItem = () => {
		setDrawerOpen(true);
	};

	const handleSelectItem = (item: Item) => {
		// Check if item already exists in cart
		const existingIndex = cartItems.findIndex(
			(cartItem) => cartItem.item.id === item.id,
		);

		if (existingIndex >= 0) {
			// If item exists, increment quantity
			const updatedItems = [...cartItems];
			updatedItems[existingIndex] = {
				...updatedItems[existingIndex],
				quantity: updatedItems[existingIndex].quantity + 1,
			};
			onCartItemsChange(updatedItems);
		} else {
			// If item doesn't exist, add with quantity 1
			const newItems = [
				...cartItems,
				{
					item,
					quantity: 1,
				},
			];
			onCartItemsChange(newItems);
		}
	};

	const handleQuantityChange = (itemId: number, quantity: number | null) => {
		if (quantity === null || quantity <= 0) {
			// Remove item if quantity is 0 or null
			handleDeleteItem(itemId);
			return;
		}

		const updatedItems = cartItems.map((cartItem) =>
			cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem,
		);
		onCartItemsChange(updatedItems);
	};

	const handleDeleteItem = (itemId: number) => {
		const updatedItems = cartItems.filter(
			(cartItem) => cartItem.item.id !== itemId,
		);
		onCartItemsChange(updatedItems);
	};

	return (
		<Box sx={{ mt: 3 }}>
			{cartItems.length === 0 ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						py: 4,
						gap: 2,
					}}
				>
					<Typography variant="body2" color="text.secondary">
						No items in cart
					</Typography>
				</Box>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					{cartItems.map((cartItem) => (
						<Card key={cartItem.item.id}>
							<CardHeader
								title={cartItem.item.name}
								subheader={formatIDR(cartItem.item.price)}
							/>
							<CardActions
								disableSpacing
								sx={{ justifyContent: "space-between" }}
							>
								<NumberSpinner
									size="small"
									min={1}
									value={cartItem.quantity}
									onValueChange={(value: number | null) =>
										handleQuantityChange(cartItem.item.id, value)
									}
								/>
								<Button
									aria-label="delete"
									color="error"
									onClick={() => handleDeleteItem(cartItem.item.id)}
									size="large"
									variant="outlined"
									startIcon={<DeleteIcon />}
								>
									Delete
								</Button>
							</CardActions>
						</Card>
					))}
				</Box>
			)}

			<Box sx={{ mt: 2 }}>
				<Button
					variant="outlined"
					startIcon={<AddIcon />}
					onClick={handleAddItem}
					fullWidth
				>
					Add Item
				</Button>
			</Box>

			<ItemSelectorDrawer
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				onSelectItem={handleSelectItem}
			/>
		</Box>
	);
}
