import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { formatIDR } from "../../utils/money";
import {
	digitsOnly,
	normalizeNameForDb,
	parseIntFromFormatted,
} from "../../utils/string";

export interface ItemFormValues {
	name: string;
	price: number;
}

export interface ItemFormProps {
	initialName: string;
	initialPrice: string;
	onSubmit: (values: ItemFormValues) => void | Promise<void>;
	loading?: boolean;
	error?: string | null;
	submitLabel: string;
}

export function ItemForm({
	initialName,
	initialPrice,
	onSubmit,
	loading = false,
	submitLabel,
}: ItemFormProps) {
	const [name, setName] = useState(initialName);
	const [price, setPrice] = useState(initialPrice);

	useEffect(() => {
		setName(initialName);
		setPrice(initialPrice);
	}, [initialName, initialPrice]);

	const handleSubmit = async (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		try {
			await onSubmit({
				name: normalizeNameForDb(name),
				price: parseIntFromFormatted(price),
			});
		} catch {
			// Error handled by parent / snackbar
		}
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = digitsOnly(e.target.value);
		if (value === "") {
			setPrice("");
			return;
		}
		const formatted = formatIDR(parseInt(value, 10));
		setPrice(formatted);
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
			<TextField
				fullWidth
				label="Price"
				value={price}
				onChange={handlePriceChange}
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
