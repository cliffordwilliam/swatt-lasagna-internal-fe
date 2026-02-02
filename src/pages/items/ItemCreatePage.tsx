import { Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ItemForm } from "../../components/items/ItemForm";
import { useCreateItem } from "./useCreateItem";

function ItemCreatePage() {
	const navigate = useNavigate();
	const { create, loading } = useCreateItem();
	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async (values: { name: string; price: number }) => {
		try {
			await create(values);
			enqueueSnackbar("Item created successfully", { variant: "success" });
			navigate("/items");
		} catch (e) {
			enqueueSnackbar(
				e instanceof Error ? e.message : "Failed to create item",
				{ variant: "error" },
			);
		}
	};

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Create Item
			</Typography>
			<ItemForm
				initialName=""
				initialPrice=""
				onSubmit={handleSubmit}
				loading={loading}
				submitLabel="Create Item"
			/>
		</Container>
	);
}

export default ItemCreatePage;
