import {
	Container,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Paper,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Address } from "../../api/addresses";
import type { Person } from "../../api/persons";
import type { Phone } from "../../api/phones";
import type { CartItem } from "../../components/orders/CartItemsManager";
import { OrderForm } from "../../components/orders/OrderForm";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { formatIDR } from "../../utils/money";
import { useOrder } from "./useOrder";
import { useOrderOptions } from "./useOrderOptions";

function OrderDetailPage() {
	const { id } = useParams<{ id: string }>();
	const { order, loading, error } = useOrder(id);
	const { deliveryMethods, paymentMethods, orderStatuses } = useOrderOptions();

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

	if (loading) return <PageLoading />;
	if (error) {
		return <PageError title="Order Detail" message={error} />;
	}
	if (!order) {
		return <PageError title="Order Detail" message="Order not found" />;
	}

	return (
		<Container sx={{ py: 4, pb: 11 }}>
			<Typography variant="h4" gutterBottom>
				Order Detail
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
				onSelectBuyer={() => {}}
				onSelectRecipient={() => {}}
				onSelectBuyerPhone={() => {}}
				onSelectRecipientPhone={() => {}}
				onSelectBuyerAddress={() => {}}
				onSelectRecipientAddress={() => {}}
				onOpenDeliveryMethodDrawer={() => {}}
				onOpenPaymentMethodDrawer={() => {}}
				onOpenOrderStatusDrawer={() => {}}
				readOnly={true}
			/>
			<Paper sx={{ mt: 3 }}>
				<List
					disablePadding
					subheader={
						<ListSubheader disableSticky component="div">
							Order Items
						</ListSubheader>
					}
				>
					{cartItems.length === 0 ? (
						<ListItem>
							<ListItemText primary="No items in this order" />
						</ListItem>
					) : (
						cartItems.map((cartItem) => (
							<ListItem key={cartItem.item.id} divider>
								<ListItemText
									primary={`${cartItem.item.name} × ${cartItem.quantity}`}
									secondary={`${formatIDR(cartItem.item.price * cartItem.quantity)}`}
								/>
							</ListItem>
						))
					)}
				</List>
			</Paper>
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

export default OrderDetailPage;
