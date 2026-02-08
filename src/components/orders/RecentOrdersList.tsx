import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Box, Card, Chip, Divider, Stack, Typography } from "@mui/material";
import type { RecentOrder } from "../../api/dashboard";
import { formatDate } from "../../utils/date";
import { formatIDR } from "../../utils/money";
import { getOrderStatusColor } from "../../utils/orderStatus";

export function RecentOrdersList({ orders }: { orders: RecentOrder[] }) {
	if (orders.length === 0) {
		return <Typography color="text.secondary">No recent orders.</Typography>;
	}

	return (
		<Stack spacing={2}>
			{orders.map((order) => (
				<Card key={order.id}>
					<Box sx={{ p: 2 }}>
						<Typography gutterBottom variant="h5" component="div">
							{order.order_number}
						</Typography>
						<Stack direction="row" spacing={1} alignItems="center">
							<CalendarTodayIcon fontSize="small" color="action" />
							<Typography variant="body2" color="text.secondary">
								{formatDate(order.order_date)}
							</Typography>
						</Stack>
						<Stack
							direction="row"
							sx={{ justifyContent: "space-between", alignItems: "center" }}
						>
							<Typography variant="body2" color="text.secondary">
								{order.recipient_name}
							</Typography>
							<Chip
								label={order.status}
								variant="outlined"
								color={getOrderStatusColor(order.status)}
							/>
						</Stack>
					</Box>
					<Divider />
					<Box sx={{ p: 2 }}>
						<Typography fontWeight="medium" component="div">
							{formatIDR(order.total_amount)}
						</Typography>
					</Box>
				</Card>
			))}
		</Stack>
	);
}
