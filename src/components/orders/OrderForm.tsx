import AssignmentIcon from "@mui/icons-material/Assignment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SaveIcon from "@mui/icons-material/Save";
import {
	Avatar,
	Box,
	CircularProgress,
	Fab,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Paper,
	TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import type { Address } from "../../api/addresses";
import type {
	DeliveryMethod,
	OrderStatus,
	PaymentMethod,
} from "../../api/orders";
import type { Person } from "../../api/persons";
import type { Phone } from "../../api/phones";
import { formatIDR } from "../../utils/money";
import { normalizeNameForDb } from "../../utils/string";

export interface OrderFormProps {
	orderNumber: string;
	orderDate: string;
	deliveryDate: string;
	shippingCost: string;
	note: string;
	onOrderNumberChange: (value: string) => void;
	onOrderDateChange: (value: string) => void;
	onDeliveryDateChange: (value: string) => void;
	onShippingCostChange: (value: string) => void;
	onNoteChange: (value: string) => void;
	buyer: Person | null;
	recipient: Person | null;
	buyerPhone: Phone | null;
	recipientPhone: Phone | null;
	buyerAddress: Address | null;
	recipientAddress: Address | null;
	deliveryMethods: DeliveryMethod[];
	paymentMethods: PaymentMethod[];
	orderStatuses: OrderStatus[];
	deliveryMethodId: number | null;
	paymentMethodId: number | null;
	orderStatusId: number | null;
	onSelectBuyer: () => void;
	onSelectRecipient: () => void;
	onSelectBuyerPhone: () => void;
	onSelectRecipientPhone: () => void;
	onSelectBuyerAddress: () => void;
	onSelectRecipientAddress: () => void;
	onOpenDeliveryMethodDrawer: () => void;
	onOpenPaymentMethodDrawer: () => void;
	onOpenOrderStatusDrawer: () => void;
	onSubmit?: () => void | Promise<void>;
	loading?: boolean;
	submitLabel?: string;
	readOnly?: boolean;
}

interface PersonListItemProps {
	person: Person | null;
	placeholder: string;
	label: string;
	onClick: () => void;
	readOnly?: boolean;
}

function PersonSelectionRow({
	person,
	placeholder,
	label,
	onClick,
	readOnly = false,
}: PersonListItemProps) {
	return (
		<ListItem disablePadding divider>
			<ListItemButton onClick={onClick} disabled={readOnly}>
				<ListItemAvatar>
					<Avatar>
						<PersonIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={person ? person.name : placeholder}
					secondary={person ? label : "Tap to choose"}
				/>
				{!readOnly && <ChevronRightIcon />}
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
	readOnly?: boolean;
}

function PhoneSelectionRow({
	phone,
	placeholder,
	label,
	onClick,
	disabled,
	readOnly = false,
}: PhoneListItemProps) {
	return (
		<ListItem disablePadding divider>
			<ListItemButton onClick={onClick} disabled={disabled || readOnly}>
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
				{!readOnly && <ChevronRightIcon />}
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
	readOnly?: boolean;
}

function AddressSelectionRow({
	address,
	placeholder,
	label,
	onClick,
	disabled,
	readOnly = false,
}: AddressListItemProps) {
	return (
		<ListItem disablePadding divider>
			<ListItemButton onClick={onClick} disabled={disabled || readOnly}>
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
				{!readOnly && <ChevronRightIcon />}
			</ListItemButton>
		</ListItem>
	);
}

interface OptionSelectionRowProps {
	selectedName: string | null;
	placeholder: string;
	label: string;
	onClick: () => void;
	icon: React.ReactNode;
	readOnly?: boolean;
}

function OptionSelectionRow({
	selectedName,
	placeholder,
	label,
	onClick,
	icon,
	readOnly = false,
}: OptionSelectionRowProps) {
	return (
		<ListItem disablePadding divider>
			<ListItemButton onClick={onClick} disabled={readOnly}>
				<ListItemAvatar>
					<Avatar>{icon}</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={selectedName ?? placeholder}
					secondary={selectedName ? label : "Tap to choose"}
				/>
				{!readOnly && <ChevronRightIcon />}
			</ListItemButton>
		</ListItem>
	);
}

export function OrderForm({
	orderNumber,
	orderDate,
	deliveryDate,
	shippingCost,
	note,
	onOrderNumberChange,
	onOrderDateChange,
	onDeliveryDateChange,
	onShippingCostChange,
	onNoteChange,
	buyer,
	recipient,
	buyerPhone,
	recipientPhone,
	buyerAddress,
	recipientAddress,
	deliveryMethods,
	paymentMethods,
	orderStatuses,
	deliveryMethodId,
	paymentMethodId,
	orderStatusId,
	onSelectBuyer,
	onSelectRecipient,
	onSelectBuyerPhone,
	onSelectRecipientPhone,
	onSelectBuyerAddress,
	onSelectRecipientAddress,
	onOpenDeliveryMethodDrawer,
	onOpenPaymentMethodDrawer,
	onOpenOrderStatusDrawer,
	onSubmit,
	loading = false,
	submitLabel = "Create Order",
	readOnly = false,
}: OrderFormProps) {
	const handleShippingCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "");
		if (value === "") {
			onShippingCostChange("");
			return;
		}
		onShippingCostChange(formatIDR(parseInt(value, 10)));
	};

	const deliveryMethodName =
		deliveryMethodId !== null
			? (deliveryMethods.find((m) => m.id === deliveryMethodId)?.name ?? null)
			: null;
	const paymentMethodName =
		paymentMethodId !== null
			? (paymentMethods.find((m) => m.id === paymentMethodId)?.name ?? null)
			: null;
	const orderStatusName =
		orderStatusId !== null
			? (orderStatuses.find((s) => s.id === orderStatusId)?.name ?? null)
			: null;

	return (
		<Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
			<Paper>
				<List
					disablePadding
					subheader={
						<ListSubheader disableSticky component="div">
							Order Information
						</ListSubheader>
					}
				>
					<ListItem
						sx={{
							flexDirection: "column",
							alignItems: "stretch",
							px: 2,
							pb: 2,
						}}
					>
						<TextField
							fullWidth
							label="Order Number"
							value={orderNumber}
							onChange={(e) => onOrderNumberChange(e.target.value)}
							onBlur={(e) =>
								onOrderNumberChange(normalizeNameForDb(e.target.value))
							}
							margin="normal"
							required
							disabled={readOnly}
							slotProps={{ htmlInput: { maxLength: 50 } }}
						/>
						<DatePicker
							label="Order Date"
							value={orderDate ? dayjs(orderDate) : null}
							onChange={(newValue) => {
								onOrderDateChange(
									newValue ? newValue.format("YYYY-MM-DD") : "",
								);
							}}
							disabled={readOnly}
							slotProps={{
								textField: {
									fullWidth: true,
									margin: "normal",
									required: true,
								},
							}}
						/>
					</ListItem>
				</List>
			</Paper>
			<Paper>
				<List
					disablePadding
					subheader={
						<ListSubheader disableSticky component="div">
							Buyer
						</ListSubheader>
					}
				>
					<PersonSelectionRow
						person={buyer}
						placeholder="Select buyer"
						label="Buyer"
						onClick={onSelectBuyer}
						readOnly={readOnly}
					/>
					<PhoneSelectionRow
						phone={buyerPhone}
						placeholder="Select buyer phone"
						label="Buyer Phone"
						onClick={onSelectBuyerPhone}
						disabled={!buyer}
						readOnly={readOnly}
					/>
					<AddressSelectionRow
						address={buyerAddress}
						placeholder="Select buyer address"
						label="Buyer Address"
						onClick={onSelectBuyerAddress}
						disabled={!buyer}
						readOnly={readOnly}
					/>
				</List>
			</Paper>
			<Paper>
				<List
					disablePadding
					subheader={
						<ListSubheader disableSticky component="div">
							Recipient
						</ListSubheader>
					}
				>
					<PersonSelectionRow
						person={recipient}
						placeholder="Select recipient"
						label="Recipient"
						onClick={onSelectRecipient}
						readOnly={readOnly}
					/>
					<PhoneSelectionRow
						phone={recipientPhone}
						placeholder="Select recipient phone"
						label="Recipient Phone"
						onClick={onSelectRecipientPhone}
						disabled={!recipient}
						readOnly={readOnly}
					/>
					<AddressSelectionRow
						address={recipientAddress}
						placeholder="Select recipient address"
						label="Recipient Address"
						onClick={onSelectRecipientAddress}
						disabled={!recipient}
						readOnly={readOnly}
					/>
				</List>
			</Paper>
			<Paper>
				<List
					disablePadding
					subheader={
						<ListSubheader disableSticky component="div">
							Order Details
						</ListSubheader>
					}
				>
					<OptionSelectionRow
						selectedName={deliveryMethodName}
						placeholder="Select delivery method"
						label="Delivery method"
						onClick={onOpenDeliveryMethodDrawer}
						icon={<LocalShippingIcon />}
						readOnly={readOnly}
					/>
					<OptionSelectionRow
						selectedName={paymentMethodName}
						placeholder="Select payment method"
						label="Payment method"
						onClick={onOpenPaymentMethodDrawer}
						icon={<PaymentIcon />}
						readOnly={readOnly}
					/>
					<OptionSelectionRow
						selectedName={orderStatusName}
						placeholder="Select order status"
						label="Order status"
						onClick={onOpenOrderStatusDrawer}
						icon={<AssignmentIcon />}
						readOnly={readOnly}
					/>
				</List>
			</Paper>
			<Paper>
				<List
					disablePadding
					subheader={
						<ListSubheader disableSticky component="div">
							Additional Details
						</ListSubheader>
					}
				>
					<ListItem
						sx={{
							flexDirection: "column",
							alignItems: "stretch",
							px: 2,
							pb: 2,
						}}
					>
						<DatePicker
							label="Delivery Date"
							value={deliveryDate ? dayjs(deliveryDate) : null}
							onChange={(newValue) => {
								onDeliveryDateChange(
									newValue ? newValue.format("YYYY-MM-DD") : "",
								);
							}}
							disabled={readOnly}
							slotProps={{
								textField: {
									fullWidth: true,
									margin: "normal",
									required: true,
								},
							}}
						/>
						<TextField
							fullWidth
							label="Shipping Cost"
							value={shippingCost}
							onChange={handleShippingCostChange}
							margin="normal"
							required
							disabled={readOnly}
						/>
						<TextField
							fullWidth
							label="Note"
							value={note}
							onChange={(e) => onNoteChange(e.target.value)}
							margin="normal"
							multiline
							rows={4}
							disabled={readOnly}
							slotProps={{ htmlInput: { maxLength: 500 } }}
						/>
					</ListItem>
				</List>
			</Paper>
			{onSubmit && !readOnly && (
				<Fab
					variant="extended"
					color="primary"
					sx={{
						position: "fixed",
						bottom: 72,
						right: 16,
					}}
					onClick={onSubmit}
					disabled={loading}
				>
					{loading ? (
						<CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
					) : (
						<SaveIcon sx={{ mr: 1 }} />
					)}
					{submitLabel}
				</Fab>
			)}
		</Box>
	);
}
