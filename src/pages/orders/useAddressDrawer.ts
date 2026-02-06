import { useState } from "react";
import type { Address } from "../../api/addresses";

export function useAddressDrawer(
	personId: number | null,
	address: Address | null,
	onSelectAddress: (address: Address) => void,
) {
	const [open, setOpen] = useState(false);

	const openDrawer = () => setOpen(true);
	const closeDrawer = () => setOpen(false);

	const handleSelectAddress = (selected: Address) => {
		onSelectAddress(selected);
		closeDrawer();
	};

	return {
		open,
		openDrawer,
		closeDrawer,
		personId,
		selectedAddressId: address?.id ?? null,
		handleSelectAddress,
	};
}
