import type React from "react";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import type { Item } from "../types/item";

interface ItemDropdownProps {
	onItemSelected: (item: Item | undefined) => void;
	initialItemId?: number;
}

const ItemDropdown: React.FC<ItemDropdownProps> = ({
	onItemSelected,
	initialItemId,
}) => {
	const [items, setItems] = useState<Item[]>([]);
	const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const fetchedItems = await getItems();
				setItems(fetchedItems);
				if (fetchedItems.length > 0 && initialItemId === undefined) {
					const firstItem = fetchedItems[0];
					setSelectedItem(firstItem);
					onItemSelected(firstItem);
				} else if (initialItemId !== undefined) {
					const initialSelectedItem = fetchedItems.find(
						(item) => item.id === initialItemId,
					);
					setSelectedItem(initialSelectedItem);
					onItemSelected(initialSelectedItem);
				}
			} catch (err) {
				setError("Failed to load items.");
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchItems();
	}, [onItemSelected, initialItemId]);

	const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newItemId = Number(e.target.value);
		const selected = items.find((item) => item.id === newItemId);
		setSelectedItem(selected);
		onItemSelected(selected);
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
		<select value={selectedItem?.id} onChange={handleItemChange}>
			{items.map((item) => (
				<option key={item.id} value={item.id}>
					{item.name}
				</option>
			))}
		</select>
	);
};

export default ItemDropdown;
