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
import type { Person } from "../../api/persons";
import { searchPersons } from "../../api/persons";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";
import { normalizeNameForDb } from "../../utils/string";
import { PersonCreateDialog } from "../persons/PersonCreateDialog";
import { PersonsList } from "../persons/PersonsList";

type SelectorMode = "buyer" | "recipient" | null;

export interface PersonSelectorDrawerProps {
	open: boolean;
	mode: SelectorMode;
	onClose: () => void;
	onSelectPerson: (person: Person) => void;
	selectedPersonId?: number | null;
}

export function PersonSelectorDrawer({
	open,
	mode,
	onClose,
	onSelectPerson,
	selectedPersonId = null,
}: PersonSelectorDrawerProps) {
	const { getToken } = useAuth();
	const [persons, setPersons] = useState<Person[]>([]);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searching, setSearching] = useState(false);
	const [searchError, setSearchError] = useState<string | null>(null);

	const runSearch = useCallback(
		async (normalized: string) => {
			if (normalized.length === 0) return;
			setSearching(true);
			setSearchError(null);
			setPersons([]);
			try {
				const token = await getToken();
				const results = await searchPersons(normalized, token);
				setPersons(results);
			} catch (error) {
				setSearchError((error as Error).message);
			} finally {
				setSearching(false);
			}
		},
		[getToken],
	);

	const [debouncedRunSearch, cancelDebounce] = useDebouncedCallback(runSearch);

	const headerLabel =
		mode === "buyer" ? "Buyer" : mode === "recipient" ? "Recipient" : "Person";

	const resetState = useCallback(() => {
		cancelDebounce();
		setPersons([]);
		setSearchQuery("");
		setSearchError(null);
		setSearching(false);
	}, [cancelDebounce]);

	useEffect(() => {
		if (!open) return;
		resetState();
	}, [open, resetState]);

	const handlePersonSelect = (person: Person) => {
		onSelectPerson(person);
		onClose();
	};

	const handleQueryChange = useCallback(
		(value: string) => {
			setSearchQuery(value);
			setSearchError(null);
			const normalized = normalizeNameForDb(value);
			if (normalized.length === 0) {
				cancelDebounce();
				setPersons([]);
				return;
			}
			debouncedRunSearch(normalized);
		},
		[cancelDebounce, debouncedRunSearch],
	);

	const emptyMessage = searching
		? "Searching..."
		: searchError
			? ""
			: normalizeNameForDb(searchQuery).length === 0
				? "Search for a person by name."
				: "No person found for that name.";

	const handleAddPerson = () => {
		setCreateDialogOpen(true);
	};

	const handleCreateSuccess = useCallback(() => {
		cancelDebounce();
		setSearchQuery("");
		setPersons([]);
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
					{headerLabel}
				</Typography>
			</Box>
			<Container>
				<TextField
					placeholder="Search person"
					variant="outlined"
					fullWidth
					value={searchQuery}
					onChange={(event) => handleQueryChange(event.target.value)}
					sx={{ mb: 3 }}
					autoFocus
				/>
				<PersonsList
					persons={persons}
					onSelectPerson={handlePersonSelect}
					selectedPersonId={selectedPersonId}
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
				aria-label="Add person"
				onClick={handleAddPerson}
			>
				<AddIcon />
			</Fab>
			<PersonCreateDialog
				open={createDialogOpen}
				onClose={() => setCreateDialogOpen(false)}
				onSuccess={handleCreateSuccess}
			/>
		</Drawer>
	);
}
