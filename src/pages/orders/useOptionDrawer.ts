import { useState } from "react";

export function useOptionDrawer(
	selectedId: number | null,
	onSelect: (id: number) => void,
) {
	const [open, setOpen] = useState(false);

	const openDrawer = () => setOpen(true);
	const closeDrawer = () => setOpen(false);

	const handleSelect = (id: number) => {
		onSelect(id);
		closeDrawer();
	};

	return {
		open,
		openDrawer,
		closeDrawer,
		selectedId,
		handleSelect,
	};
}
