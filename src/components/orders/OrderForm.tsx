import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Paper,
} from "@mui/material";
import type { Person } from "../../api/persons";

export interface OrderFormProps {
	buyer: Person | null;
	recipient: Person | null;
	onSelectBuyer: () => void;
	onSelectRecipient: () => void;
}

interface PersonListItemProps {
	person: Person | null;
	placeholder: string;
	label: string;
	onClick: () => void;
}

function PersonSelectionRow({
	person,
	placeholder,
	label,
	onClick,
}: PersonListItemProps) {
	return (
		<ListItem disablePadding divider>
			<ListItemButton onClick={onClick}>
				<ListItemAvatar>
					<Avatar>
						<PersonIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={person ? person.name : placeholder}
					secondary={person ? label : "Tap to choose"}
				/>
				<ChevronRightIcon />
			</ListItemButton>
		</ListItem>
	);
}

export function OrderForm({
	buyer,
	recipient,
	onSelectBuyer,
	onSelectRecipient,
}: OrderFormProps) {
	return (
		<Paper sx={{ mt: 3 }}>
			<List disablePadding>
				<PersonSelectionRow
					person={buyer}
					placeholder="Select buyer"
					label="Buyer"
					onClick={onSelectBuyer}
				/>
				<PersonSelectionRow
					person={recipient}
					placeholder="Select recipient"
					label="Recipient"
					onClick={onSelectRecipient}
				/>
			</List>
		</Paper>
	);
}
