import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

export function OrderActionsDrawer({
	open,
	onClose,
	onView,
	onUpdate,
}: {
	open: boolean;
	onClose: () => void;
	onView: () => void;
	onUpdate: () => void;
}) {
	return (
		<Drawer anchor="bottom" open={open} onClose={onClose}>
			<Box role="presentation">
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={onView}>
							<ListItemIcon>
								<VisibilityIcon />
							</ListItemIcon>
							<ListItemText primary="View" />
						</ListItemButton>
					</ListItem>
					<Divider />
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
