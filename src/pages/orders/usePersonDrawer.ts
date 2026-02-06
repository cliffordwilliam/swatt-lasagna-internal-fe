import { useState } from "react";
import type { Person } from "../../api/persons";

export function usePersonDrawer(
	person: Person | null,
	onSelectPerson: (person: Person) => void,
) {
	const [open, setOpen] = useState(false);

	const openDrawer = () => setOpen(true);
	const closeDrawer = () => setOpen(false);

	const handleSelectPerson = (selected: Person) => {
		onSelectPerson(selected);
		closeDrawer();
	};

	return {
		open,
		openDrawer,
		closeDrawer,
		selectedPersonId: person?.id ?? null,
		handleSelectPerson,
	};
}
