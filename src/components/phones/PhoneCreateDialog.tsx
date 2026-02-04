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
import { useCreatePhone } from "../../pages/phones/useCreatePhone";
import { PhoneForm } from "./PhoneForm";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<unknown>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export interface PhoneCreateDialogProps {
	open: boolean;
	personId: number;
	onClose: () => void;
	onSuccess?: () => void;
}

export function PhoneCreateDialog({
	open,
	personId,
	onClose,
	onSuccess,
}: PhoneCreateDialogProps) {
	const { create, loading } = useCreatePhone();
	const { enqueueSnackbar } = useSnackbar();
	const formId = "phone-create-form";

	const handleSubmit = async (values: { phone_number: string }) => {
		try {
			await create({
				person_id: personId,
				phone_number: values.phone_number,
			});
			enqueueSnackbar("Phone created successfully", { variant: "success" });
			onClose();
			onSuccess?.();
		} catch (e) {
			enqueueSnackbar(
				e instanceof Error ? e.message : "Failed to create phone",
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
						Create Phone
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
			<PhoneForm
				formId={formId}
				initialPhoneNumber=""
				onSubmit={handleSubmit}
			/>
		</Dialog>
	);
}
