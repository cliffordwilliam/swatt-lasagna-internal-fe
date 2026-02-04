import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import {
	Avatar,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Paper,
} from "@mui/material";
import type { Address } from "../../api/addresses";
import type { Person } from "../../api/persons";
import type { Phone } from "../../api/phones";

export interface OrderFormProps {
	buyer: Person | null;
	recipient: Person | null;
	buyerPhone: Phone | null;
	recipientPhone: Phone | null;
	buyerAddress: Address | null;
	recipientAddress: Address | null;
	onSelectBuyer: () => void;
	onSelectRecipient: () => void;
	onSelectBuyerPhone: () => void;
	onSelectRecipientPhone: () => void;
	onSelectBuyerAddress: () => void;
	onSelectRecipientAddress: () => void;
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

interface PhoneListItemProps {
	phone: Phone | null;
	placeholder: string;
	label: string;
	onClick: () => void;
	disabled: boolean;
}

function PhoneSelectionRow({
	phone,
	placeholder,
	label,
	onClick,
	disabled,
}: PhoneListItemProps) {
	return (
		<ListItem disablePadding divider>
			<ListItemButton onClick={onClick} disabled={disabled}>
				<ListItemAvatar>
					<Avatar>
						<PhoneIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={phone ? phone.phone_number : placeholder}
					secondary={
						phone ? label : disabled ? "Select person first" : "Tap to choose"
					}
				/>
				<ChevronRightIcon />
			</ListItemButton>
		</ListItem>
	);
}

interface AddressListItemProps {
	address: Address | null;
	placeholder: string;
	label: string;
	onClick: () => void;
	disabled: boolean;
}

function AddressSelectionRow({
	address,
	placeholder,
	label,
	onClick,
	disabled,
}: AddressListItemProps) {
	return (
		<ListItem disablePadding divider>
			<ListItemButton onClick={onClick} disabled={disabled}>
				<ListItemAvatar>
					<Avatar>
						<LocationOnIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={address ? address.address : placeholder}
					secondary={
						address ? label : disabled ? "Select person first" : "Tap to choose"
					}
				/>
				<ChevronRightIcon />
			</ListItemButton>
		</ListItem>
	);
}

export function OrderForm({
	buyer,
	recipient,
	buyerPhone,
	recipientPhone,
	buyerAddress,
	recipientAddress,
	onSelectBuyer,
	onSelectRecipient,
	onSelectBuyerPhone,
	onSelectRecipientPhone,
	onSelectBuyerAddress,
	onSelectRecipientAddress,
}: OrderFormProps) {
	return (
		<Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
			<Paper>
				<List
					disablePadding
					subheader={<ListSubheader component="div">Buyer</ListSubheader>}
				>
					<PersonSelectionRow
						person={buyer}
						placeholder="Select buyer"
						label="Buyer"
						onClick={onSelectBuyer}
					/>
					<PhoneSelectionRow
						phone={buyerPhone}
						placeholder="Select buyer phone"
						label="Buyer Phone"
						onClick={onSelectBuyerPhone}
						disabled={!buyer}
					/>
					<AddressSelectionRow
						address={buyerAddress}
						placeholder="Select buyer address"
						label="Buyer Address"
						onClick={onSelectBuyerAddress}
						disabled={!buyer}
					/>
				</List>
			</Paper>
			<Paper>
				<List
					disablePadding
					subheader={<ListSubheader component="div">Recipient</ListSubheader>}
				>
					<PersonSelectionRow
						person={recipient}
						placeholder="Select recipient"
						label="Recipient"
						onClick={onSelectRecipient}
					/>
					<PhoneSelectionRow
						phone={recipientPhone}
						placeholder="Select recipient phone"
						label="Recipient Phone"
						onClick={onSelectRecipientPhone}
						disabled={!recipient}
					/>
					<AddressSelectionRow
						address={recipientAddress}
						placeholder="Select recipient address"
						label="Recipient Address"
						onClick={onSelectRecipientAddress}
						disabled={!recipient}
					/>
				</List>
			</Paper>
		</Box>
	);
}
