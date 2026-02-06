import { useAuth } from "@clerk/clerk-react";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
	Box,
	Container,
	Drawer,
	Fab,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import type { Address } from "../../api/addresses";
import { searchAddresses } from "../../api/addresses";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";
import { AddressCreateDialog } from "./AddressCreateDialog";
import { AddressesList } from "./AddressesList";

export interface AddressSelectorDrawerProps {
	open: boolean;
	personId: number;
	onClose: () => void;
	onSelectAddress: (address: Address) => void;
	selectedAddressId?: number | null;
}

export function AddressSelectorDrawer({
	open,
	personId,
	onClose,
	onSelectAddress,
	selectedAddressId = null,
}: AddressSelectorDrawerProps) {
	const { getToken } = useAuth();
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searching, setSearching] = useState(false);
	const [searchError, setSearchError] = useState<string | null>(null);

	const runSearch = useCallback(
		async (query: string) => {
			if (query.length === 0) return;
			setSearching(true);
			setSearchError(null);
			setAddresses([]);
			try {
				const token = await getToken();
				const results = await searchAddresses(personId, query, token);
				setAddresses(results);
			} catch (error) {
				setSearchError((error as Error).message);
			} finally {
				setSearching(false);
			}
		},
		[getToken, personId],
	);

	const [debouncedRunSearch, cancelDebounce] = useDebouncedCallback(runSearch);

	const resetState = useCallback(() => {
		cancelDebounce();
		setAddresses([]);
		setSearchQuery("");
		setSearchError(null);
		setSearching(false);
	}, [cancelDebounce]);

	useEffect(() => {
		if (!open) return;
		resetState();
	}, [open, resetState]);

	const handleAddressSelect = (address: Address) => {
		onSelectAddress(address);
		onClose();
	};

	const handleQueryChange = useCallback(
		(value: string) => {
			setSearchQuery(value);
			setSearchError(null);
			const trimmed = value.trim();
			if (trimmed.length === 0) {
				cancelDebounce();
				setAddresses([]);
				return;
			}
			debouncedRunSearch(trimmed);
		},
		[cancelDebounce, debouncedRunSearch],
	);

	const emptyMessage = searching
		? "Searching..."
		: searchError
			? ""
			: searchQuery.trim().length === 0
				? "Search for an address."
				: "No address found for that query.";

	const handleAddAddress = () => {
		setCreateDialogOpen(true);
	};

	const handleCreateSuccess = useCallback(() => {
		cancelDebounce();
		setSearchQuery("");
		setAddresses([]);
		setSearchError(null);
		setSearching(false);
	}, [cancelDebounce]);

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={onClose}
			slotProps={{
				paper: {
					sx: {
						width: "100vw",
						display: "flex",
						flexDirection: "column",
						height: "100%",
					},
				},
			}}
		>
			<Box
				component="header"
				sx={{
					display: "flex",
					alignItems: "center",
					minHeight: 64,
					px: 1,
					gap: 2,
				}}
			>
				<IconButton aria-label="Close" onClick={onClose}>
					<ChevronLeftIcon />
				</IconButton>
				<Typography variant="h6" component="span">
					Address
				</Typography>
			</Box>
			<Container>
				<TextField
					placeholder="Search address"
					variant="outlined"
					fullWidth
					value={searchQuery}
					onChange={(event) => handleQueryChange(event.target.value)}
					sx={{ mb: 3 }}
					autoFocus
				/>
				<AddressesList
					addresses={addresses}
					onSelectAddress={handleAddressSelect}
					selectedAddressId={selectedAddressId}
					loading={searching}
					error={searchError}
					emptyMessage={emptyMessage}
				/>
			</Container>
			<Fab
				sx={{
					position: "absolute",
					bottom: 16,
					right: 16,
				}}
				color="primary"
				aria-label="Add address"
				onClick={handleAddAddress}
			>
				<AddIcon />
			</Fab>
			<AddressCreateDialog
				open={createDialogOpen}
				personId={personId}
				onClose={() => setCreateDialogOpen(false)}
				onSuccess={handleCreateSuccess}
			/>
		</Drawer>
	);
}
