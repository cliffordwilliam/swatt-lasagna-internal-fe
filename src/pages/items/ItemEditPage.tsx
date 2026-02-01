import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { formatIDR } from "../../utils/money";
import { normalizeNameForDb } from "../../utils/string";
import { useItem } from "./useItem";
import { useUpdateItem } from "./useUpdateItem";

function ItemEditPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { item, loading, error } = useItem(id);
	const { update, loading: updating, error: updateError } = useUpdateItem();
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (item) {
			setName(item.name);
			setPrice(formatIDR(item.price));
		}
	}, [item]);

	if (loading) return <PageLoading />;
	if (error) {
		return <PageError title="Edit Item" message={error} />;
	}
	if (!item) {
		return <PageError title="Edit Item" message="Item not found" />;
	}

	const handleSubmit = async (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		if (!id) return;
		try {
			await update(id, {
				name: normalizeNameForDb(name),
				price: parseInt(price.replace(/\D/g, ""), 10),
			});
			enqueueSnackbar("Item updated successfully", { variant: "success" });
			navigate("/items");
		} catch (e) {
			enqueueSnackbar("Failed to update item", { variant: "error" });
		}
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "");
		if (value === "") {
			setPrice("");
			return;
		}
		const formatted = formatIDR(parseInt(value, 10));
		setPrice(formatted);
	};

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Edit Item
			</Typography>
			{updateError && (
				<Typography color="error" sx={{ mb: 2 }}>
					{updateError}
				</Typography>
			)}
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
					sx={{ mt: 2 }}
					loading={updating}
					loadingPosition="start"
					startIcon={<SaveIcon />}
				>
					Save Changes
				</Button>
			</Box>
		</Container>
	);
}

export default ItemEditPage;
