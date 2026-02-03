import PersonIcon from "@mui/icons-material/Person";
import {
	Avatar,
	Box,
	CircularProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import type { Person } from "../../api/persons";

export interface PersonsListProps {
	persons: Person[];
	onSelectPerson: (person: Person) => void;
	selectedPersonId?: number | null;
	loading?: boolean;
	error?: string | null;
	emptyMessage?: string;
}

export function PersonsList({
	persons,
	onSelectPerson,
	selectedPersonId = null,
	loading = false,
	error = null,
	emptyMessage = "No results found",
}: PersonsListProps) {
	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return <Typography color="error">{error}</Typography>;
	}

	if (persons.length === 0) {
		return <Typography>{emptyMessage}</Typography>;
	}

	return (
		<List disablePadding>
			{persons.map((person) => (
				<ListItem key={person.id} disablePadding>
					<ListItemButton
						selected={selectedPersonId === person.id}
						onClick={() => onSelectPerson(person)}
					>
						<ListItemAvatar>
							<Avatar>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={person.name} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}
