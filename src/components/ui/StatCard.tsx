import { Card, CardContent, Typography } from "@mui/material";
import type { ChipProps } from "@mui/material/Chip";
import type { ReactNode } from "react";

type StatCardProps = {
	title: string;
	value: ReactNode;
	subtitle?: string;
	/** MUI color for the title (e.g. from getOrderStatusColor) */
	titleColor?: ChipProps["color"];
};

export function StatCard({
	title,
	value,
	subtitle = "Last 30 days",
	titleColor,
}: StatCardProps) {
	const resolvedColor =
		titleColor && titleColor !== "default" ? titleColor : "text.secondary";
	return (
		<Card>
			<CardContent>
				<Typography color={resolvedColor} gutterBottom fontSize={14}>
					{title}
				</Typography>
				<Typography variant="h5" component="div">
					{value}
				</Typography>
				<Typography color="text.secondary">{subtitle}</Typography>
			</CardContent>
		</Card>
	);
}
