import EditIcon from "@mui/icons-material/Edit";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

export function OrderActionsDrawer({
	open,
	onClose,
	onUpdate,
}: {
	open: boolean;
	onClose: () => void;
	onUpdate: () => void;
}) {
	return (
		<Drawer anchor="bottom" open={open} onClose={onClose}>
			<Box role="presentation">
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={onUpdate}>
							<ListItemIcon>
								<EditIcon />
							</ListItemIcon>
							<ListItemText primary="Update" />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
}
