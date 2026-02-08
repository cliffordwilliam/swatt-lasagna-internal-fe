import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import type { UpcomingDelivery } from "../../api/dashboard";
import { formatDate } from "../../utils/date";

export function UpcomingDeliveriesList({
	deliveries,
}: {
	deliveries: UpcomingDelivery[];
}) {
	if (deliveries.length === 0) {
		return (
			<Typography color="text.secondary">No upcoming deliveries.</Typography>
		);
	}

	return (
		<Stack spacing={2}>
			{deliveries.map((delivery) => (
				<Card key={delivery.delivery_day}>
					<Box sx={{ p: 2 }}>
						<Typography gutterBottom variant="h5" component="div">
							{formatDate(delivery.delivery_day)}
						</Typography>
						<Stack direction="row" spacing={1} alignItems="center">
							<CalendarTodayIcon fontSize="small" color="action" />
							<Typography variant="body2" color="text.secondary">
								Delivery day
							</Typography>
						</Stack>
					</Box>
					<Divider />
					<Box sx={{ p: 2 }}>
						<Typography fontWeight="medium" component="div">
							{delivery.order_count} order
							{delivery.order_count !== 1 ? "s" : ""} scheduled
						</Typography>
					</Box>
				</Card>
			))}
		</Stack>
	);
}
