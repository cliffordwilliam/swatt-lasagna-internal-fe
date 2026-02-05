import {
	Container,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Paper,
	Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Address } from "../../api/addresses";
import type { Person } from "../../api/persons";
import type { Phone } from "../../api/phones";
import { AddressSelectorDrawer } from "../../components/addresses/AddressSelectorDrawer";
import {
	type CartItem,
	CartItemsManager,
} from "../../components/orders/CartItemsManager";
import { OptionSelectorDrawer } from "../../components/orders/OptionSelectorDrawer";
import { OrderForm } from "../../components/orders/OrderForm";
import { PersonSelectorDrawer } from "../../components/orders/PersonSelectorDrawer";
import { PhoneSelectorDrawer } from "../../components/phones/PhoneSelectorDrawer";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { formatIDR } from "../../utils/money";
import { useOrder } from "./useOrder";
import { useOrderOptions } from "./useOrderOptions";
import { useUpdateOrder } from "./useUpdateOrder";

type DrawerMode = "buyer" | "recipient" | null;
type PhoneDrawerMode = "buyer" | "recipient" | null;
type AddressDrawerMode = "buyer" | "recipient" | null;
type OptionDrawerMode = "delivery" | "payment" | "status" | null;

function OrderEditPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { order, loading, error } = useOrder(id);
	const { update, loading: updating } = useUpdateOrder();
	const { deliveryMethods, paymentMethods, orderStatuses } = useOrderOptions();
	const { enqueueSnackbar } = useSnackbar();

	const [orderNumber, setOrderNumber] = useState("");
	const [orderDate, setOrderDate] = useState("");
	const [deliveryDate, setDeliveryDate] = useState("");
	const [shippingCost, setShippingCost] = useState("");
	const [note, setNote] = useState("");
	const [buyer, setBuyer] = useState<Person | null>(null);
	const [recipient, setRecipient] = useState<Person | null>(null);
	const [buyerPhone, setBuyerPhone] = useState<Phone | null>(null);
	const [recipientPhone, setRecipientPhone] = useState<Phone | null>(null);
	const [buyerAddress, setBuyerAddress] = useState<Address | null>(null);
	const [recipientAddress, setRecipientAddress] = useState<Address | null>(
		null,
	);
	const [deliveryMethodId, setDeliveryMethodId] = useState<number | null>(null);
	const [paymentMethodId, setPaymentMethodId] = useState<number | null>(null);
	const [orderStatusId, setOrderStatusId] = useState<number | null>(null);
	const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
	const [phoneDrawerMode, setPhoneDrawerMode] = useState<PhoneDrawerMode>(null);
	const [addressDrawerMode, setAddressDrawerMode] =
		useState<AddressDrawerMode>(null);
	const [optionDrawerMode, setOptionDrawerMode] =
		useState<OptionDrawerMode>(null);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	// Load order data into form state
	useEffect(() => {
		if (order) {
			setOrderNumber(order.order_number);
			setOrderDate(order.order_date.split("T")[0]);
			setDeliveryDate(order.delivery_date.split("T")[0]);
			setShippingCost(formatIDR(order.shipping_cost));
			setNote(order.note || "");
			setDeliveryMethodId(order.delivery_method_id);
			setPaymentMethodId(order.payment_method_id);
			setOrderStatusId(order.order_status_id);

			// Map buyer data
			setBuyer({ id: order.buyer.id, name: order.buyer.name });
			setBuyerPhone({
				id: order.buyer.phone.id,
				phone_number: order.buyer.phone.phone_number,
			});
			setBuyerAddress({
				id: order.buyer.address.id,
				address: order.buyer.address.address,
			});

			// Map recipient data
			setRecipient({ id: order.recipient.id, name: order.recipient.name });
			setRecipientPhone({
				id: order.recipient.phone.id,
				phone_number: order.recipient.phone.phone_number,
			});
			setRecipientAddress({
				id: order.recipient.address.id,
				address: order.recipient.address.address,
			});

			// Map order items to cart items
			const mappedCartItems: CartItem[] = order.items.map((orderItem) => ({
				item: {
					id: orderItem.item_id,
					name: orderItem.item_name,
					price: orderItem.item_price,
				},
				quantity: orderItem.quantity,
			}));
			setCartItems(mappedCartItems);
		}
	}, [order]);

	const selectedPersonId =
		drawerMode === "buyer"
			? (buyer?.id ?? null)
			: drawerMode === "recipient"
				? (recipient?.id ?? null)
				: null;

	const selectedPhoneId =
		phoneDrawerMode === "buyer"
			? (buyerPhone?.id ?? null)
			: phoneDrawerMode === "recipient"
				? (recipientPhone?.id ?? null)
				: null;

	const selectedAddressId =
		addressDrawerMode === "buyer"
			? (buyerAddress?.id ?? null)
			: addressDrawerMode === "recipient"
				? (recipientAddress?.id ?? null)
				: null;

	const personIdForPhone =
		phoneDrawerMode === "buyer"
			? (buyer?.id ?? null)
			: phoneDrawerMode === "recipient"
				? (recipient?.id ?? null)
				: null;

	const personIdForAddress =
		addressDrawerMode === "buyer"
			? (buyer?.id ?? null)
			: addressDrawerMode === "recipient"
				? (recipient?.id ?? null)
				: null;

	const handleSelectPerson = (person: Person) => {
		if (drawerMode === "buyer") {
			setBuyer(person);
			// Clear phone and address when person changes
			setBuyerPhone(null);
			setBuyerAddress(null);
		} else if (drawerMode === "recipient") {
			setRecipient(person);
			// Clear phone and address when person changes
			setRecipientPhone(null);
			setRecipientAddress(null);
		}
		setDrawerMode(null);
	};

	const handleSelectPhone = (phone: Phone) => {
		if (phoneDrawerMode === "buyer") {
			setBuyerPhone(phone);
		} else if (phoneDrawerMode === "recipient") {
			setRecipientPhone(phone);
		}
		setPhoneDrawerMode(null);
	};

	const handleSelectAddress = (address: Address) => {
		if (addressDrawerMode === "buyer") {
			setBuyerAddress(address);
		} else if (addressDrawerMode === "recipient") {
			setRecipientAddress(address);
		}
		setAddressDrawerMode(null);
	};

	// Calculate subtotal from cart items
	const subtotal = cartItems.reduce(
		(sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
		0,
	);

	// Parse shipping cost from formatted string (remove non-digits)
	const shipping = shippingCost
		? parseInt(shippingCost.replace(/\D/g, ""), 10) || 0
		: 0;

	// Calculate total
	const total = subtotal + shipping;

	const handleSubmit = async () => {
		if (!id) return;

		// Validate required fields
		if (!orderNumber || !orderDate || !deliveryDate) {
			enqueueSnackbar("Please fill in all required fields", {
				variant: "error",
			});
			return;
		}

		if (!buyer || !buyerPhone || !buyerAddress) {
			enqueueSnackbar("Please select buyer, buyer phone, and buyer address", {
				variant: "error",
			});
			return;
		}

		if (!recipient || !recipientPhone || !recipientAddress) {
			enqueueSnackbar(
				"Please select recipient, recipient phone, and recipient address",
				{ variant: "error" },
			);
			return;
		}

		if (
			deliveryMethodId === null ||
			paymentMethodId === null ||
			orderStatusId === null
		) {
			enqueueSnackbar(
				"Please select delivery method, payment method, and order status",
				{ variant: "error" },
			);
			return;
		}

		if (cartItems.length === 0) {
			enqueueSnackbar("Please add at least one item to the order", {
				variant: "error",
			});
			return;
		}

		// Parse shipping cost from formatted string
		const shippingCostValue = shippingCost
			? parseInt(shippingCost.replace(/\D/g, ""), 10) || 0
			: 0;

		try {
			await update(id, {
				order_number: orderNumber,
				order_date: `${orderDate}T00:00:00Z`,
				delivery_date: `${deliveryDate}T00:00:00Z`,
				buyer: {
					id: buyer.id,
					phone: { id: buyerPhone.id },
					address: { id: buyerAddress.id },
				},
				recipient: {
					id: recipient.id,
					phone: { id: recipientPhone.id },
					address: { id: recipientAddress.id },
				},
				delivery_method_id: deliveryMethodId,
				payment_method_id: paymentMethodId,
				order_status_id: orderStatusId,
				shipping_cost: shippingCostValue,
				note: note || undefined,
				items: cartItems.map((cartItem) => ({
					item_id: cartItem.item.id,
					quantity: cartItem.quantity,
				})),
			});
			enqueueSnackbar("Order updated successfully", { variant: "success" });
			navigate("/orders");
		} catch (e) {
			enqueueSnackbar(
				e instanceof Error ? e.message : "Failed to update order",
				{ variant: "error" },
			);
		}
	};

	if (loading) return <PageLoading />;
	if (error) {
		return <PageError title="Edit Order" message={error} />;
	}
	if (!order) {
		return <PageError title="Edit Order" message="Order not found" />;
	}

	return (
		<Container sx={{ py: 4, pb: 11 }}>
			<Typography variant="h4" gutterBottom>
				Edit Order
			</Typography>
			<OrderForm
				orderNumber={orderNumber}
				orderDate={orderDate}
				deliveryDate={deliveryDate}
				shippingCost={shippingCost}
				note={note}
				onOrderNumberChange={setOrderNumber}
				onOrderDateChange={setOrderDate}
				onDeliveryDateChange={setDeliveryDate}
				onShippingCostChange={setShippingCost}
				onNoteChange={setNote}
				buyer={buyer}
				recipient={recipient}
				buyerPhone={buyerPhone}
				recipientPhone={recipientPhone}
				buyerAddress={buyerAddress}
				recipientAddress={recipientAddress}
				deliveryMethods={deliveryMethods}
				paymentMethods={paymentMethods}
				orderStatuses={orderStatuses}
				deliveryMethodId={deliveryMethodId}
				paymentMethodId={paymentMethodId}
				orderStatusId={orderStatusId}
				onSelectBuyer={() => setDrawerMode("buyer")}
				onSelectRecipient={() => setDrawerMode("recipient")}
				onSelectBuyerPhone={() => setPhoneDrawerMode("buyer")}
				onSelectRecipientPhone={() => setPhoneDrawerMode("recipient")}
				onSelectBuyerAddress={() => setAddressDrawerMode("buyer")}
				onSelectRecipientAddress={() => setAddressDrawerMode("recipient")}
				onOpenDeliveryMethodDrawer={() => setOptionDrawerMode("delivery")}
				onOpenPaymentMethodDrawer={() => setOptionDrawerMode("payment")}
				onOpenOrderStatusDrawer={() => setOptionDrawerMode("status")}
				onSubmit={handleSubmit}
				loading={updating}
				submitLabel="Save Changes"
			/>
			<PersonSelectorDrawer
				open={drawerMode !== null}
				mode={drawerMode}
				onClose={() => setDrawerMode(null)}
				onSelectPerson={handleSelectPerson}
				selectedPersonId={selectedPersonId}
			/>
			{personIdForPhone !== null && (
				<PhoneSelectorDrawer
					open={phoneDrawerMode !== null}
					personId={personIdForPhone}
					onClose={() => setPhoneDrawerMode(null)}
					onSelectPhone={handleSelectPhone}
					selectedPhoneId={selectedPhoneId}
				/>
			)}
			{personIdForAddress !== null && (
				<AddressSelectorDrawer
					open={addressDrawerMode !== null}
					personId={personIdForAddress}
					onClose={() => setAddressDrawerMode(null)}
					onSelectAddress={handleSelectAddress}
					selectedAddressId={selectedAddressId}
				/>
			)}
			<OptionSelectorDrawer
				open={optionDrawerMode === "delivery"}
				title="Delivery method"
				options={deliveryMethods}
				selectedId={deliveryMethodId}
				onClose={() => setOptionDrawerMode(null)}
				onSelect={setDeliveryMethodId}
			/>
			<OptionSelectorDrawer
				open={optionDrawerMode === "payment"}
				title="Payment method"
				options={paymentMethods}
				selectedId={paymentMethodId}
				onClose={() => setOptionDrawerMode(null)}
				onSelect={setPaymentMethodId}
			/>
			<OptionSelectorDrawer
				open={optionDrawerMode === "status"}
				title="Order status"
				options={orderStatuses}
				selectedId={orderStatusId}
				onClose={() => setOptionDrawerMode(null)}
				onSelect={setOrderStatusId}
			/>
			<CartItemsManager
				cartItems={cartItems}
				onCartItemsChange={setCartItems}
			/>
			<Paper sx={{ mt: 3 }}>
				<List
					disablePadding
					subheader={
						<ListSubheader disableSticky component="div">
							Order Summary
						</ListSubheader>
					}
				>
					<ListItem divider>
						<ListItemText primary="Subtotal" />
						<Typography variant="body2" color="text.secondary">
							{formatIDR(subtotal)}
						</Typography>
					</ListItem>
					<ListItem divider>
						<ListItemText primary="Shipping" />
						<Typography variant="body2" color="text.secondary">
							{shippingCost ? formatIDR(shipping) : formatIDR(0)}
						</Typography>
					</ListItem>
					<ListItem>
						<ListItemText
							primary={
								<Typography variant="subtitle1" fontWeight="bold">
									Total
								</Typography>
							}
						/>
						<Typography variant="subtitle1" fontWeight="bold">
							{formatIDR(total)}
						</Typography>
					</ListItem>
				</List>
			</Paper>
		</Container>
	);
}

export default OrderEditPage;
