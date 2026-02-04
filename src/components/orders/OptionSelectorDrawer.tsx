import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
	Box,
	Drawer,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import { useEffect } from "react";

export interface OptionItem {
	id: number;
	name: string;
}

export interface OptionSelectorDrawerProps {
	open: boolean;
	title: string;
	options: OptionItem[];
	selectedId: number | null;
	onClose: () => void;
	onSelect: (id: number) => void;
}

export function OptionSelectorDrawer({
	open,
	title,
	options,
	selectedId,
	onClose,
	onSelect,
}: OptionSelectorDrawerProps) {
	// Ensure one option is always selected when drawer is open
	useEffect(() => {
		if (!open || options.length === 0) return;
		if (selectedId === null) {
			onSelect(options[0].id);
		}
	}, [open, options, selectedId, onSelect]);

	// Always show a selection when options exist (default to first if none selected)
	const value =
		selectedId !== null
			? String(selectedId)
			: options[0]
				? String(options[0].id)
				: "";
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onSelect(Number((event.target as HTMLInputElement).value));
		onClose();
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
					{title}
				</Typography>
			</Box>
			<Box sx={{ px: 2, py: 2 }}>
				<FormControl component="fieldset" sx={{ width: "100%" }}>
					<FormLabel id={`${title}-radio-label`}>{title}</FormLabel>
					<RadioGroup
						aria-labelledby={`${title}-radio-label`}
						name={`${title}-radio-group`}
						value={value}
						onChange={handleChange}
					>
						{options.map((option) => (
							<FormControlLabel
								key={option.id}
								value={String(option.id)}
								control={<Radio />}
								label={option.name}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Box>
		</Drawer>
	);
}
