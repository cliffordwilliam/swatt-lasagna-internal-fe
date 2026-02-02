import { Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ItemForm } from "../../components/items/ItemForm";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { formatIDR } from "../../utils/money";
import { useItem } from "./useItem";
import { useUpdateItem } from "./useUpdateItem";

function ItemEditPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { item, loading, error } = useItem(id);
	const { update, loading: updating } = useUpdateItem();
	const [initialName, setInitialName] = useState("");
	const [initialPrice, setInitialPrice] = useState("");
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (item) {
			setInitialName(item.name);
			setInitialPrice(formatIDR(item.price));
		}
	}, [item]);

	const handleSubmit = async (values: { name: string; price: number }) => {
		if (!id) return;
		try {
			await update(id, values);
			enqueueSnackbar("Item updated successfully", { variant: "success" });
			navigate("/items");
		} catch (e) {
			enqueueSnackbar(
				e instanceof Error ? e.message : "Failed to update item",
				{ variant: "error" },
			);
		}
	};

	if (loading) return <PageLoading />;
	if (error) {
		return <PageError title="Edit Item" message={error} />;
	}
	if (!item) {
		return <PageError title="Edit Item" message="Item not found" />;
	}

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Edit Item
			</Typography>
			<ItemForm
				initialName={initialName}
				initialPrice={initialPrice}
				onSubmit={handleSubmit}
				loading={updating}
				submitLabel="Save Changes"
			/>
		</Container>
	);
}

export default ItemEditPage;
