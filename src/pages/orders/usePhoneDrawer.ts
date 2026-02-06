import { useState } from "react";
import type { Phone } from "../../api/phones";

export function usePhoneDrawer(
	personId: number | null,
	phone: Phone | null,
	onSelectPhone: (phone: Phone) => void,
) {
	const [open, setOpen] = useState(false);

	const openDrawer = () => setOpen(true);
	const closeDrawer = () => setOpen(false);

	const handleSelectPhone = (selected: Phone) => {
		onSelectPhone(selected);
		closeDrawer();
	};

	return {
		open,
		openDrawer,
		closeDrawer,
		personId,
		selectedPhoneId: phone?.id ?? null,
		handleSelectPhone,
	};
}
