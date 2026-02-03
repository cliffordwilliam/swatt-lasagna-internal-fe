import { Container, Typography } from "@mui/material";
import { useState } from "react";
import type { Person } from "../../api/persons";
import { OrderForm } from "../../components/orders/OrderForm";
import { PersonSelectorDrawer } from "../../components/orders/PersonSelectorDrawer";

type DrawerMode = "buyer" | "recipient" | null;

function OrderCreatePage() {
	const [buyer, setBuyer] = useState<Person | null>(null);
	const [recipient, setRecipient] = useState<Person | null>(null);
	const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);

	const selectedPersonId =
		drawerMode === "buyer"
			? (buyer?.id ?? null)
			: drawerMode === "recipient"
				? (recipient?.id ?? null)
				: null;

	const handleSelectPerson = (person: Person) => {
		if (drawerMode === "buyer") {
			setBuyer(person);
		} else if (drawerMode === "recipient") {
			setRecipient(person);
		}
		setDrawerMode(null);
	};

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Create Order
			</Typography>
			<OrderForm
				buyer={buyer}
				recipient={recipient}
				onSelectBuyer={() => setDrawerMode("buyer")}
				onSelectRecipient={() => setDrawerMode("recipient")}
			/>
			<PersonSelectorDrawer
				open={drawerMode !== null}
				mode={drawerMode}
				onClose={() => setDrawerMode(null)}
				onSelectPerson={handleSelectPerson}
				selectedPersonId={selectedPersonId}
			/>
		</Container>
	);
}

export default OrderCreatePage;
