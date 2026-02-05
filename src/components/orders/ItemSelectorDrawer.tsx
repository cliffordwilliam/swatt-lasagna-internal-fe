import { useAuth } from "@clerk/clerk-react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
	Box,
	Container,
	Drawer,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Item } from "../../api/items";
import { listItems } from "../../api/items";
import { normalizeNameForDb } from "../../utils/string";
import { ItemsListForSelector } from "../items/ItemsListForSelector";

export interface ItemSelectorDrawerProps {
	open: boolean;
	onClose: () => void;
	onSelectItem: (item: Item) => void;
	selectedItemId?: number | null;
}

export function ItemSelectorDrawer({
	open,
	onClose,
	onSelectItem,
	selectedItemId = null,
}: ItemSelectorDrawerProps) {
	const { getToken } = useAuth();
	const [allItems, setAllItems] = useState<Item[]>([]);
	const [filteredItems, setFilteredItems] = useState<Item[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const DEBOUNCE_MS = 300;

	const resetState = useCallback(() => {
		if (debounceRef.current !== null) {
			clearTimeout(debounceRef.current);
			debounceRef.current = null;
		}
		setSearchQuery("");
		setError(null);
		setLoading(false);
		setFilteredItems([]);
	}, []);

	const loadItems = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const token = await getToken();
			const items = await listItems(token);
			setAllItems(items);
			setFilteredItems(items);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	}, [getToken]);

	useEffect(() => {
		if (!open) return;
		resetState();
		loadItems();
	}, [open, resetState, loadItems]);

	useEffect(() => {
		return () => {
			if (debounceRef.current !== null) {
				clearTimeout(debounceRef.current);
			}
		};
	}, []);

	const handleItemSelect = (item: Item) => {
		onSelectItem(item);
		onClose();
	};

	const handleQueryChange = useCallback(
		(value: string) => {
			setSearchQuery(value);
			setError(null);
			const normalized = normalizeNameForDb(value);

			if (debounceRef.current !== null) {
				clearTimeout(debounceRef.current);
			}

			if (normalized.length === 0) {
				setFilteredItems(allItems);
				return;
			}

			debounceRef.current = setTimeout(() => {
				debounceRef.current = null;
				const filtered = allItems.filter((item) =>
					normalizeNameForDb(item.name ?? "").includes(normalized),
				);
				setFilteredItems(filtered);
			}, DEBOUNCE_MS);
		},
		[allItems],
	);

	const emptyMessage = loading
		? "Loading..."
		: error
			? ""
			: normalizeNameForDb(searchQuery).length === 0
				? "Search for an item by name."
				: "No item found for that name.";

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={onClose}
			slotProps={{
				paper: {
					sx: {
						width: "100vw",
						display: "flex",
						flexDirection: "column",
						height: "100%",
					},
				},
			}}
		>
			<Box
				component="header"
				sx={{
					display: "flex",
					alignItems: "center",
					minHeight: 64,
					px: 1,
					gap: 2,
				}}
			>
				<IconButton aria-label="Close" onClick={onClose}>
					<ChevronLeftIcon />
				</IconButton>
				<Typography variant="h6" component="span">
					Select Item
				</Typography>
			</Box>
			<Container>
				<TextField
					placeholder="Search item"
					variant="outlined"
					fullWidth
					value={searchQuery}
					onChange={(event) => handleQueryChange(event.target.value)}
					sx={{ mb: 3 }}
					autoFocus
				/>
				<ItemsListForSelector
					items={filteredItems}
					onSelectItem={handleItemSelect}
					selectedItemId={selectedItemId}
					loading={loading}
					error={error}
					emptyMessage={emptyMessage}
				/>
			</Container>
		</Drawer>
	);
}
