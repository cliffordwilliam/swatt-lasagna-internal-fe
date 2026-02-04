import PhoneIcon from "@mui/icons-material/Phone";
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
import type { Phone } from "../../api/phones";

export interface PhonesListProps {
	phones: Phone[];
	onSelectPhone: (phone: Phone) => void;
	selectedPhoneId?: number | null;
	loading?: boolean;
	error?: string | null;
	emptyMessage?: string;
}

export function PhonesList({
	phones,
	onSelectPhone,
	selectedPhoneId = null,
	loading = false,
	error = null,
	emptyMessage = "No results found",
}: PhonesListProps) {
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

	if (phones.length === 0) {
		return <Typography>{emptyMessage}</Typography>;
	}

	return (
		<List disablePadding>
			{phones.map((phone) => (
				<ListItem key={phone.id} disablePadding>
					<ListItemButton
						selected={selectedPhoneId === phone.id}
						onClick={() => onSelectPhone(phone)}
					>
						<ListItemAvatar>
							<Avatar>
								<PhoneIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={phone.phone_number} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}
