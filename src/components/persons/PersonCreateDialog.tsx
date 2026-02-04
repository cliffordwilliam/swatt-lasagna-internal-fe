import CloseIcon from "@mui/icons-material/Close";
import {
	AppBar,
	Button,
	Dialog,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useCreatePerson } from "../../pages/persons/useCreatePerson";
import { PersonForm } from "./PersonForm";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<unknown>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export interface PersonCreateDialogProps {
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

export function PersonCreateDialog({
	open,
	onClose,
	onSuccess,
}: PersonCreateDialogProps) {
	const { create, loading } = useCreatePerson();
	const { enqueueSnackbar } = useSnackbar();
	const formId = "person-create-form";

	const handleSubmit = async (values: { name: string }) => {
		try {
			await create(values);
			enqueueSnackbar("Person created successfully", { variant: "success" });
			onClose();
			onSuccess?.();
		} catch (e) {
			enqueueSnackbar(
				e instanceof Error ? e.message : "Failed to create person",
				{ variant: "error" },
			);
		}
	};

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={onClose}
			slots={{
				transition: Transition,
			}}
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={onClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Create Person
					</Typography>
					<Button
						color="inherit"
						type="submit"
						form={formId}
						disabled={loading}
					>
						Save
					</Button>
				</Toolbar>
			</AppBar>
			<PersonForm formId={formId} initialName="" onSubmit={handleSubmit} />
		</Dialog>
	);
}
