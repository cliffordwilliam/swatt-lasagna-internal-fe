import { Card, CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";

type StatCardProps = {
	title: string;
	value: ReactNode;
	subtitle?: string;
};

export function StatCard({
	title,
	value,
	subtitle = "Last 30 days",
}: StatCardProps) {
	return (
		<Card>
			<CardContent>
				<Typography color="text.secondary" gutterBottom fontSize={14}>
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
