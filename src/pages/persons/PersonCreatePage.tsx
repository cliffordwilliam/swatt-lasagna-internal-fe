import { Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import { PersonForm } from "../../components/persons/PersonForm";
import { useCreatePerson } from "./useCreatePerson";

function PersonCreatePage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { create, loading } = useCreatePerson();
	const { enqueueSnackbar } = useSnackbar();

	// Get return path from location state, default to orders
	const returnPath =
		(location.state as { returnPath?: string })?.returnPath || "/orders";

	const handleSubmit = async (values: { name: string }) => {
		try {
			await create(values);
			enqueueSnackbar("Person created successfully", { variant: "success" });
			navigate(returnPath);
		} catch (e) {
			enqueueSnackbar(
				e instanceof Error ? e.message : "Failed to create person",
				{ variant: "error" },
			);
		}
	};

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Create Person
			</Typography>
			<PersonForm
				initialName=""
				onSubmit={handleSubmit}
				loading={loading}
				submitLabel="Create Person"
			/>
		</Container>
	);
}

export default PersonCreatePage;
