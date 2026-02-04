import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Address } from "../../api/addresses";
import type { Person } from "../../api/persons";
import type { Phone } from "../../api/phones";
import { AddressSelectorDrawer } from "../../components/addresses/AddressSelectorDrawer";
import { OptionSelectorDrawer } from "../../components/orders/OptionSelectorDrawer";
import { OrderForm } from "../../components/orders/OrderForm";
import { PersonSelectorDrawer } from "../../components/orders/PersonSelectorDrawer";
import { PhoneSelectorDrawer } from "../../components/phones/PhoneSelectorDrawer";
import { useOrderOptions } from "./useOrderOptions";

type DrawerMode = "buyer" | "recipient" | null;
type PhoneDrawerMode = "buyer" | "recipient" | null;
type AddressDrawerMode = "buyer" | "recipient" | null;
type OptionDrawerMode = "delivery" | "payment" | "status" | null;

function OrderCreatePage() {
	const { deliveryMethods, paymentMethods, orderStatuses } = useOrderOptions();
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

	// Ensure one option is always selected when options load
	useEffect(() => {
		if (deliveryMethods.length > 0 && deliveryMethodId === null) {
			setDeliveryMethodId(deliveryMethods[0].id);
		}
	}, [deliveryMethods, deliveryMethodId]);
	useEffect(() => {
		if (paymentMethods.length > 0 && paymentMethodId === null) {
			setPaymentMethodId(paymentMethods[0].id);
		}
	}, [paymentMethods, paymentMethodId]);
	useEffect(() => {
		if (orderStatuses.length > 0 && orderStatusId === null) {
			setOrderStatusId(orderStatuses[0].id);
		}
	}, [orderStatuses, orderStatusId]);

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

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Create Order
			</Typography>
			<OrderForm
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
		</Container>
	);
}

export default OrderCreatePage;
