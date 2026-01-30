import type React from "react";
import { useEffect, useState } from "react";
import type { Item } from "../types/item";
import ItemDropdown from "./ItemDropdown";

interface CartItem {
	item_id: number;
	name: string;
	quantity: number;
}

interface CartProps {
	onCartItemsChange: (items: CartItem[]) => void;
}

const Cart: React.FC<CartProps> = ({ onCartItemsChange }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [currentItem, setCurrentItem] = useState<Item | undefined>(undefined);
	const [currentQuantity, setCurrentQuantity] = useState<number>(1);

	useEffect(() => {
		onCartItemsChange(cartItems);
	}, [cartItems, onCartItemsChange]);

	const handleAddItemToCart = () => {
		if (currentItem === undefined || currentQuantity <= 0) {
			alert("Please select an item and enter a valid quantity.");
			return;
		}

		setCartItems((prevItems) => {
			const existingItemIndex = prevItems.findIndex(
				(item) => item.item_id === currentItem.id,
			);

			if (existingItemIndex > -1) {
				const updatedItems = [...prevItems];
				updatedItems[existingItemIndex].quantity += currentQuantity;
				return updatedItems;
			} else {
				return [
					...prevItems,
					{
						item_id: currentItem.id,
						name: currentItem.name,
						quantity: currentQuantity,
					},
				];
			}
		});
		setCurrentQuantity(1);
	};

	const handleUpdateCartItemQuantity = (id: number, newQuantity: number) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.item_id === id ? { ...item, quantity: newQuantity } : item,
			),
		);
	};

	const handleRemoveCartItem = (id: number) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.item_id !== id),
		);
	};

	return (
		<>
			<div>
				<h3>Add Item to Cart</h3>
				<div>
					<label htmlFor="item_dropdown_add">Select Item:</label>
					<ItemDropdown
						onItemSelected={setCurrentItem}
						initialItemId={currentItem?.id}
					/>
				</div>
				<div>
					<label htmlFor="quantity_add">Quantity:</label>
					<input
						type="number"
						id="quantity_add"
						name="quantity_add"
						value={currentQuantity}
						onChange={(e) => setCurrentQuantity(Number(e.target.value))}
						min="1"
						required
					/>
				</div>
				<button type="button" onClick={handleAddItemToCart}>
					Add to Cart
				</button>
			</div>

			<h3>Cart Items</h3>
			{cartItems.length === 0 ? (
				<p>No items in cart.</p>
			) : (
				<ul>
					{cartItems.map((item) => {
						return (
							<li key={item.item_id}>
								{item.name}, Quantity:
								<input
									type="number"
									value={item.quantity}
									onChange={(e) =>
										handleUpdateCartItemQuantity(
											item.item_id,
											Number(e.target.value),
										)
									}
									min="1"
								/>
								<button
									type="button"
									onClick={() => handleRemoveCartItem(item.item_id)}
								>
									Remove
								</button>
							</li>
						);
					})}{" "}
				</ul>
			)}
		</>
	);
};

export default Cart;
