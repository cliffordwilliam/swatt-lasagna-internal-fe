import { Container, Typography } from "@mui/material";
import { useState } from "react";
import type { Address } from "../../api/addresses";
import type { Person } from "../../api/persons";
import type { Phone } from "../../api/phones";
import { AddressSelectorDrawer } from "../../components/addresses/AddressSelectorDrawer";
import { OrderForm } from "../../components/orders/OrderForm";
import { PersonSelectorDrawer } from "../../components/orders/PersonSelectorDrawer";
import { PhoneSelectorDrawer } from "../../components/phones/PhoneSelectorDrawer";

type DrawerMode = "buyer" | "recipient" | null;
type PhoneDrawerMode = "buyer" | "recipient" | null;
type AddressDrawerMode = "buyer" | "recipient" | null;

function OrderCreatePage() {
	const [buyer, setBuyer] = useState<Person | null>(null);
	const [recipient, setRecipient] = useState<Person | null>(null);
	const [buyerPhone, setBuyerPhone] = useState<Phone | null>(null);
	const [recipientPhone, setRecipientPhone] = useState<Phone | null>(null);
	const [buyerAddress, setBuyerAddress] = useState<Address | null>(null);
	const [recipientAddress, setRecipientAddress] = useState<Address | null>(
		null,
	);
	const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
	const [phoneDrawerMode, setPhoneDrawerMode] = useState<PhoneDrawerMode>(null);
	const [addressDrawerMode, setAddressDrawerMode] =
		useState<AddressDrawerMode>(null);

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
				onSelectBuyer={() => setDrawerMode("buyer")}
				onSelectRecipient={() => setDrawerMode("recipient")}
				onSelectBuyerPhone={() => setPhoneDrawerMode("buyer")}
				onSelectRecipientPhone={() => setPhoneDrawerMode("recipient")}
				onSelectBuyerAddress={() => setAddressDrawerMode("buyer")}
				onSelectRecipientAddress={() => setAddressDrawerMode("recipient")}
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
		</Container>
	);
}

export default OrderCreatePage;
