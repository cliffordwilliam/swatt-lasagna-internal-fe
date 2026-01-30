import type React from "react";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import type { Item } from "../types/item";

interface ItemDropdownProps {
	onItemSelected: (itemId: number) => void;
	initialItemId?: number;
}

const ItemDropdown: React.FC<ItemDropdownProps> = ({
	onItemSelected,
	initialItemId,
}) => {
	const [items, setItems] = useState<Item[]>([]);
	const [selectedItemId, setSelectedItemId] = useState<number | undefined>(
		initialItemId,
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const fetchedItems = await getItems();
				setItems(fetchedItems);
				if (fetchedItems.length > 0 && selectedItemId === undefined) {
					setSelectedItemId(fetchedItems[0].id);
					onItemSelected(fetchedItems[0].id);
				} else if (selectedItemId !== undefined) {
					onItemSelected(selectedItemId);
				}
			} catch (err) {
				setError("Failed to load items.");
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchItems();
	}, [onItemSelected, selectedItemId]);

	const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newItemId = Number(e.target.value);
		setSelectedItemId(newItemId);
		onItemSelected(newItemId);
	};

	if (isLoading) {
		return <div>Loading items...</div>;
	}

	if (error) {
		return <div style={{ color: "red" }}>{error}</div>;
	}

	if (items.length === 0) {
		return <div>No items available.</div>;
	}

	return (
		<select value={selectedItemId} onChange={handleItemChange}>
			{items.map((item) => (
				<option key={item.id} value={item.id}>
					{item.name}
				</option>
			))}
		</select>
	);
};

export default ItemDropdown;
