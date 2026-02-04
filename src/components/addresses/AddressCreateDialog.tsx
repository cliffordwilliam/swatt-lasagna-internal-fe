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
import { useCreateAddress } from "../../pages/addresses/useCreateAddress";
import { AddressForm } from "./AddressForm";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<unknown>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export interface AddressCreateDialogProps {
	open: boolean;
	personId: number;
	onClose: () => void;
	onSuccess?: () => void;
}

export function AddressCreateDialog({
	open,
	personId,
	onClose,
	onSuccess,
}: AddressCreateDialogProps) {
	const { create, loading } = useCreateAddress();
	const { enqueueSnackbar } = useSnackbar();
	const formId = "address-create-form";

	const handleSubmit = async (values: { address: string }) => {
		try {
			await create({
				person_id: personId,
				address: values.address,
			});
			enqueueSnackbar("Address created successfully", { variant: "success" });
			onClose();
			onSuccess?.();
		} catch (e) {
			enqueueSnackbar(
				e instanceof Error ? e.message : "Failed to create address",
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
						Create Address
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
			<AddressForm formId={formId} initialAddress="" onSubmit={handleSubmit} />
		</Dialog>
	);
}
