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
import { useNavigate, useParams } from "react-router-dom";
import { AddressSelectorDrawer } from "../../components/addresses/AddressSelectorDrawer";
import { CartItemsManager } from "../../components/orders/CartItemsManager";
import { OptionSelectorDrawer } from "../../components/orders/OptionSelectorDrawer";
import { OrderForm } from "../../components/orders/OrderForm";
import { PersonSelectorDrawer } from "../../components/orders/PersonSelectorDrawer";
import { PhoneSelectorDrawer } from "../../components/phones/PhoneSelectorDrawer";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { formatIDR } from "../../utils/money";
import { normalizeNameForDb, parseIntFromFormatted } from "../../utils/string";
import { useOrder } from "./useOrder";
import { useOrderFormState } from "./useOrderFormState";
import { useOrderFormValidation } from "./useOrderFormValidation";
import { useUpdateOrder } from "./useUpdateOrder";

function OrderEditPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { order, loading, error } = useOrder(id);
	const { update, loading: updating } = useUpdateOrder();
	const { enqueueSnackbar } = useSnackbar();
	const form = useOrderFormState(order);
	const validateOrderForm = useOrderFormValidation();
	const {
		orderNumber,
		orderDate,
		deliveryDate,
		shippingCost,
		note,
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
		cartItems,
		setOrderNumber,
		setOrderDate,
		setDeliveryDate,
		setShippingCost,
		setNote,
		summary,
		buyerPersonDrawer,
		recipientPersonDrawer,
		buyerPhoneDrawer,
		recipientPhoneDrawer,
		buyerAddressDrawer,
		recipientAddressDrawer,
		deliveryDrawer,
		paymentDrawer,
		statusDrawer,
	} = form;

	const handleSubmit = async () => {
		if (!id) return;

		if (
			!validateOrderForm({
				orderNumber,
				orderDate,
				deliveryDate,
				buyer,
				buyerPhone,
				buyerAddress,
				recipient,
				recipientPhone,
				recipientAddress,
				deliveryMethodId,
				paymentMethodId,
				orderStatusId,
				cartItems,
			})
		) {
			return;
		}

		const shippingCostValue = parseIntFromFormatted(shippingCost);

		try {
			await update(id, {
				order_number: normalizeNameForDb(orderNumber),
				order_date: `${orderDate}T00:00:00Z`,
				delivery_date: `${deliveryDate}T00:00:00Z`,
				buyer: {
					id: buyer!.id,
					phone: { id: buyerPhone!.id },
					address: { id: buyerAddress!.id },
				},
				recipient: {
					id: recipient!.id,
					phone: { id: recipientPhone!.id },
					address: { id: recipientAddress!.id },
				},
				delivery_method_id: deliveryMethodId!,
				payment_method_id: paymentMethodId!,
				order_status_id: orderStatusId!,
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
				onSelectBuyer={buyerPersonDrawer.openDrawer}
				onSelectRecipient={recipientPersonDrawer.openDrawer}
				onSelectBuyerPhone={buyerPhoneDrawer.openDrawer}
				onSelectRecipientPhone={recipientPhoneDrawer.openDrawer}
				onSelectBuyerAddress={buyerAddressDrawer.openDrawer}
				onSelectRecipientAddress={recipientAddressDrawer.openDrawer}
				onOpenDeliveryMethodDrawer={deliveryDrawer.openDrawer}
				onOpenPaymentMethodDrawer={paymentDrawer.openDrawer}
				onOpenOrderStatusDrawer={statusDrawer.openDrawer}
				onSubmit={handleSubmit}
				loading={updating}
				submitLabel="Save Changes"
			/>
			<PersonSelectorDrawer
				open={buyerPersonDrawer.open}
				mode="buyer"
				onClose={buyerPersonDrawer.closeDrawer}
				onSelectPerson={buyerPersonDrawer.handleSelectPerson}
				selectedPersonId={buyerPersonDrawer.selectedPersonId}
			/>
			<PersonSelectorDrawer
				open={recipientPersonDrawer.open}
				mode="recipient"
				onClose={recipientPersonDrawer.closeDrawer}
				onSelectPerson={recipientPersonDrawer.handleSelectPerson}
				selectedPersonId={recipientPersonDrawer.selectedPersonId}
			/>
			{buyerPhoneDrawer.personId !== null && (
				<PhoneSelectorDrawer
					open={buyerPhoneDrawer.open}
					personId={buyerPhoneDrawer.personId}
					onClose={buyerPhoneDrawer.closeDrawer}
					onSelectPhone={buyerPhoneDrawer.handleSelectPhone}
					selectedPhoneId={buyerPhoneDrawer.selectedPhoneId}
				/>
			)}
			{recipientPhoneDrawer.personId !== null && (
				<PhoneSelectorDrawer
					open={recipientPhoneDrawer.open}
					personId={recipientPhoneDrawer.personId}
					onClose={recipientPhoneDrawer.closeDrawer}
					onSelectPhone={recipientPhoneDrawer.handleSelectPhone}
					selectedPhoneId={recipientPhoneDrawer.selectedPhoneId}
				/>
			)}
			{buyerAddressDrawer.personId !== null && (
				<AddressSelectorDrawer
					open={buyerAddressDrawer.open}
					personId={buyerAddressDrawer.personId}
					onClose={buyerAddressDrawer.closeDrawer}
					onSelectAddress={buyerAddressDrawer.handleSelectAddress}
					selectedAddressId={buyerAddressDrawer.selectedAddressId}
				/>
			)}
			{recipientAddressDrawer.personId !== null && (
				<AddressSelectorDrawer
					open={recipientAddressDrawer.open}
					personId={recipientAddressDrawer.personId}
					onClose={recipientAddressDrawer.closeDrawer}
					onSelectAddress={recipientAddressDrawer.handleSelectAddress}
					selectedAddressId={recipientAddressDrawer.selectedAddressId}
				/>
			)}
			<OptionSelectorDrawer
				open={deliveryDrawer.open}
				title="Delivery method"
				options={deliveryMethods}
				selectedId={deliveryDrawer.selectedId}
				onClose={deliveryDrawer.closeDrawer}
				onSelect={deliveryDrawer.handleSelect}
			/>
			<OptionSelectorDrawer
				open={paymentDrawer.open}
				title="Payment method"
				options={paymentMethods}
				selectedId={paymentDrawer.selectedId}
				onClose={paymentDrawer.closeDrawer}
				onSelect={paymentDrawer.handleSelect}
			/>
			<OptionSelectorDrawer
				open={statusDrawer.open}
				title="Order status"
				options={orderStatuses}
				selectedId={statusDrawer.selectedId}
				onClose={statusDrawer.closeDrawer}
				onSelect={statusDrawer.handleSelect}
			/>
			<CartItemsManager
				cartItems={cartItems}
				onCartItemsChange={form.setCartItems}
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
							{formatIDR(summary.subtotal)}
						</Typography>
					</ListItem>
					<ListItem divider>
						<ListItemText primary="Shipping" />
						<Typography variant="body2" color="text.secondary">
							{shippingCost ? formatIDR(summary.shipping) : formatIDR(0)}
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
							{formatIDR(summary.total)}
						</Typography>
					</ListItem>
				</List>
			</Paper>
		</Container>
	);
}

export default OrderEditPage;
