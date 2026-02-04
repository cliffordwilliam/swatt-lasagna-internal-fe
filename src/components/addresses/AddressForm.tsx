import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export interface AddressFormValues {
	address: string;
}

export interface AddressFormProps {
	initialAddress: string;
	onSubmit: (values: AddressFormValues) => void | Promise<void>;
	error?: string | null;
	formId: string;
}

export function AddressForm({
	initialAddress,
	onSubmit,
	formId,
}: AddressFormProps) {
	const [address, setAddress] = useState(initialAddress);

	useEffect(() => {
		setAddress(initialAddress);
	}, [initialAddress]);

	const handleSubmit = async (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		try {
			await onSubmit({
				address: address.trim(),
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
				label="Address"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				margin="normal"
				required
				multiline
				rows={3}
				inputProps={{ maxLength: 500 }}
			/>
		</Box>
	);
}
