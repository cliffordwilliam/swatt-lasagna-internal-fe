import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export interface PhoneFormValues {
	phone_number: string;
}

export interface PhoneFormProps {
	initialPhoneNumber: string;
	onSubmit: (values: PhoneFormValues) => void | Promise<void>;
	error?: string | null;
	formId: string;
}

export function PhoneForm({
	initialPhoneNumber,
	onSubmit,
	formId,
}: PhoneFormProps) {
	const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);

	useEffect(() => {
		setPhoneNumber(initialPhoneNumber);
	}, [initialPhoneNumber]);

	const handleSubmit = async (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		try {
			await onSubmit({
				phone_number: phoneNumber.trim(),
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
				label="Phone Number"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				margin="normal"
				required
				inputProps={{ maxLength: 25 }}
			/>
		</Box>
	);
}
