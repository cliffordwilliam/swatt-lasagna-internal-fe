import LocationOnIcon from "@mui/icons-material/LocationOn";
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
import type { Address } from "../../api/addresses";

export interface AddressesListProps {
	addresses: Address[];
	onSelectAddress: (address: Address) => void;
	selectedAddressId?: number | null;
	loading?: boolean;
	error?: string | null;
	emptyMessage?: string;
}

export function AddressesList({
	addresses,
	onSelectAddress,
	selectedAddressId = null,
	loading = false,
	error = null,
	emptyMessage = "No results found",
}: AddressesListProps) {
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

	if (addresses.length === 0) {
		return <Typography>{emptyMessage}</Typography>;
	}

	return (
		<List disablePadding>
			{addresses.map((address) => (
				<ListItem key={address.id} disablePadding>
					<ListItemButton
						selected={selectedAddressId === address.id}
						onClick={() => onSelectAddress(address)}
					>
						<ListItemAvatar>
							<Avatar>
								<LocationOnIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={address.address} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}
