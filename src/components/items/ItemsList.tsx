import Inventory2Icon from "@mui/icons-material/Inventory2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	Avatar,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
} from "@mui/material";
import type { Item } from "../../api/items";
import { formatIDR } from "../../utils/money";

export function ItemsList({
	items,
	onActionClick,
}: {
	items: Item[];
	onActionClick: (item: Item) => void;
}) {
	return (
		<Paper>
			<List disablePadding>
				{items.map((item, index) => (
					<ListItem
						key={item.id}
						divider={index !== items.length - 1}
						secondaryAction={
							<IconButton
								edge="end"
								aria-label="actions"
								onClick={() => onActionClick(item)}
							>
								<MoreVertIcon />
							</IconButton>
						}
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
					</ListItem>
				))}
			</List>
		</Paper>
	);
}
