import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { normalizeNameForDb } from "../../utils/string";

export interface PersonFormValues {
	name: string;
}

export interface PersonFormProps {
	initialName: string;
	onSubmit: (values: PersonFormValues) => void | Promise<void>;
	error?: string | null;
	formId: string;
}

export function PersonForm({ initialName, onSubmit, formId }: PersonFormProps) {
	const [name, setName] = useState(initialName);

	useEffect(() => {
		setName(initialName);
	}, [initialName]);

	const handleSubmit = async (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		try {
			await onSubmit({
				name: normalizeNameForDb(name),
			});
		} catch {
			// Error handled by parent / snackbar
		}
	};

	return (
		<Box
			component="form"
			id={formId}
			onSubmit={handleSubmit}
			sx={{ mt: 3, px: 2 }}
		>
			<TextField
				fullWidth
				label="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				onBlur={(e) => setName(normalizeNameForDb(e.target.value))}
				margin="normal"
				required
			/>
		</Box>
	);
}
