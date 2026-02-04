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
import { useCallback, useEffect, useRef, useState } from "react";
import type { Phone } from "../../api/phones";
import { searchPhones } from "../../api/phones";
import { PhoneCreateDialog } from "./PhoneCreateDialog";
import { PhonesList } from "./PhonesList";

export interface PhoneSelectorDrawerProps {
	open: boolean;
	personId: number;
	onClose: () => void;
	onSelectPhone: (phone: Phone) => void;
	selectedPhoneId?: number | null;
}

export function PhoneSelectorDrawer({
	open,
	personId,
	onClose,
	onSelectPhone,
	selectedPhoneId = null,
}: PhoneSelectorDrawerProps) {
	const { getToken } = useAuth();
	const [phones, setPhones] = useState<Phone[]>([]);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searching, setSearching] = useState(false);
	const [searchError, setSearchError] = useState<string | null>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const DEBOUNCE_MS = 300;

	const resetState = useCallback(() => {
		if (debounceRef.current !== null) {
			clearTimeout(debounceRef.current);
			debounceRef.current = null;
		}
		setPhones([]);
		setSearchQuery("");
		setSearchError(null);
		setSearching(false);
	}, []);

	useEffect(() => {
		if (!open) return;
		resetState();
	}, [open, resetState]);

	useEffect(() => {
		return () => {
			if (debounceRef.current !== null) {
				clearTimeout(debounceRef.current);
			}
		};
	}, []);

	const handlePhoneSelect = (phone: Phone) => {
		onSelectPhone(phone);
		onClose();
	};

	const runSearch = useCallback(
		async (query: string) => {
			if (query.length === 0) return;
			setSearching(true);
			setSearchError(null);
			setPhones([]);
			try {
				const token = await getToken();
				const results = await searchPhones(personId, query, token);
				setPhones(results);
			} catch (error) {
				setSearchError((error as Error).message);
			} finally {
				setSearching(false);
			}
		},
		[getToken, personId],
	);

	const handleQueryChange = useCallback(
		(value: string) => {
			setSearchQuery(value);
			setSearchError(null);
			const trimmed = value.trim();
			if (trimmed.length === 0) {
				setPhones([]);
				if (debounceRef.current !== null) {
					clearTimeout(debounceRef.current);
					debounceRef.current = null;
				}
				return;
			}
			if (debounceRef.current !== null) {
				clearTimeout(debounceRef.current);
			}
			debounceRef.current = setTimeout(() => {
				debounceRef.current = null;
				runSearch(trimmed);
			}, DEBOUNCE_MS);
		},
		[runSearch],
	);

	const emptyMessage = searching
		? "Searching..."
		: searchError
			? ""
			: searchQuery.trim().length === 0
				? "Search for a phone number."
				: "No phone found for that number.";

	const handleAddPhone = () => {
		setCreateDialogOpen(true);
	};

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
					Phone
				</Typography>
			</Box>
			<Container>
				<TextField
					placeholder="Search phone number"
					variant="outlined"
					fullWidth
					value={searchQuery}
					onChange={(event) => handleQueryChange(event.target.value)}
					sx={{ mb: 3 }}
					autoFocus
				/>
				<PhonesList
					phones={phones}
					onSelectPhone={handlePhoneSelect}
					selectedPhoneId={selectedPhoneId}
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
				aria-label="Add phone"
				onClick={handleAddPhone}
			>
				<AddIcon />
			</Fab>
			<PhoneCreateDialog
				open={createDialogOpen}
				personId={personId}
				onClose={() => setCreateDialogOpen(false)}
			/>
		</Drawer>
	);
}
