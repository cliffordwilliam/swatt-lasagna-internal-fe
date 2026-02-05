import Inventory2Icon from "@mui/icons-material/Inventory2";
import {
	Avatar,
	Box,
	CircularProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import type { Item } from "../../api/items";
import { formatIDR } from "../../utils/money";

export interface ItemsListForSelectorProps {
	items: Item[];
	onSelectItem: (item: Item) => void;
	selectedItemId?: number | null;
	loading?: boolean;
	error?: string | null;
	emptyMessage?: string;
}

export function ItemsListForSelector({
	items,
	onSelectItem,
	selectedItemId = null,
	loading = false,
	error = null,
	emptyMessage = "No results found",
}: ItemsListForSelectorProps) {
	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return <Typography color="error">{error}</Typography>;
	}

	if (items.length === 0) {
		return <Typography>{emptyMessage}</Typography>;
	}

	return (
		<List disablePadding>
			{items.map((item) => (
				<ListItem key={item.id} disablePadding>
					<ListItemButton
						selected={selectedItemId === item.id}
						onClick={() => onSelectItem(item)}
					>
						<ListItemAvatar>
							<Avatar>
								<Inventory2Icon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={item.name}
							secondary={formatIDR(item.price)}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}
