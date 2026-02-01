import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

export function ItemActionsDrawer({
	open,
	onClose,
	onEdit,
	onDelete,
}: {
	open: boolean;
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
}) {
	return (
		<Drawer anchor="bottom" open={open} onClose={onClose}>
			<Box role="presentation">
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={onEdit}>
							<ListItemIcon>
								<EditIcon />
							</ListItemIcon>
							<ListItemText primary="Edit" />
						</ListItemButton>
					</ListItem>
					<Divider />
					<ListItem disablePadding>
						<ListItemButton onClick={onDelete} disabled>
							<ListItemIcon>
								<DeleteIcon />
							</ListItemIcon>
							<ListItemText primary="Delete" />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
}
