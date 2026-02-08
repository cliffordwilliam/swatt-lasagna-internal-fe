import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, Card, Chip, Divider, Stack, Typography } from "@mui/material";
import type { TodaysDelivery } from "../../api/dashboard";
import { getOrderStatusColor } from "../../utils/orderStatus";

export function TodaysDeliveriesList({
	deliveries,
}: {
	deliveries: TodaysDelivery[];
}) {
	if (deliveries.length === 0) {
		return (
			<Typography color="text.secondary">
				No deliveries scheduled for today.
			</Typography>
		);
	}

	return (
		<Stack spacing={2}>
			{deliveries.map((delivery) => (
				<Card key={delivery.id}>
					<Box sx={{ p: 2 }}>
						<Typography gutterBottom variant="h5" component="div">
							{delivery.order_number}
						</Typography>
						<Stack
							direction="row"
							sx={{ justifyContent: "space-between", alignItems: "center" }}
						>
							<Stack direction="row" spacing={1} alignItems="center">
								<LocalShippingIcon fontSize="small" color="action" />
								<Typography variant="body2" color="text.secondary">
									{delivery.delivery_method}
								</Typography>
							</Stack>
							<Chip
								label={delivery.status}
								variant="outlined"
								color={getOrderStatusColor(delivery.status)}
							/>
						</Stack>
					</Box>
					<Divider />
					<Box sx={{ p: 2 }}>
						<Typography gutterBottom variant="h6" component="div">
							{delivery.recipient_name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{delivery.recipient_address}
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
							{delivery.recipient_phone}
						</Typography>
					</Box>
				</Card>
			))}
		</Stack>
	);
}
