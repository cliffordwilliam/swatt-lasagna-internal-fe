import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { normalizeNameForDb } from "../../utils/string";

export interface PersonFormValues {
	name: string;
}

export interface PersonFormProps {
	initialName: string;
	onSubmit: (values: PersonFormValues) => void | Promise<void>;
	loading?: boolean;
	error?: string | null;
	submitLabel: string;
}

export function PersonForm({
	initialName,
	onSubmit,
	loading = false,
	submitLabel,
}: PersonFormProps) {
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
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
			<TextField
				fullWidth
				label="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				onBlur={(e) => setName(normalizeNameForDb(e.target.value))}
				margin="normal"
				required
			/>
			<Button
				type="submit"
				variant="contained"
				size="large"
				fullWidth
				disabled={loading}
				sx={{ mt: 2 }}
				startIcon={<SaveIcon />}
			>
				{submitLabel}
			</Button>
		</Box>
	);
}
