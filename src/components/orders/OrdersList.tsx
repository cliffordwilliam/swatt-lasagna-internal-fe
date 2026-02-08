import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	Box,
	Card,
	Chip,
	Divider,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import type { Order } from "../../api/orders";
import { formatDate } from "../../utils/date";
import { formatIDR } from "../../utils/money";
import { getOrderStatusColor } from "../../utils/orderStatus";

export function OrdersList({
	orders,
	onActionClick,
}: {
	orders: Order[];
	onActionClick: (order: Order) => void;
}) {
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
							<Stack direction="row" spacing={1} alignItems="center">
								<LocalShippingIcon fontSize="small" color="action" />
								<Typography variant="body2" color="text.secondary">
									{formatDate(order.delivery_date)}
								</Typography>
							</Stack>
							<Chip
								label={order.order_status_name}
								variant="outlined"
								color={getOrderStatusColor(order.order_status_name)}
							/>
						</Stack>
					</Box>
					<Divider />
					<Box sx={{ p: 2 }}>
						<Typography gutterBottom variant="h6" component="div">
							{order.recipient_name}
						</Typography>
						{order.recipient_address && (
							<Typography variant="body2" color="text.secondary">
								{order.recipient_address}
							</Typography>
						)}
					</Box>
					<Divider />
					<Box sx={{ p: 2 }}>
						<Stack
							direction="row"
							sx={{
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography fontWeight="medium" component="div">
								{formatIDR(order.total_amount)}
							</Typography>
							<IconButton
								edge="end"
								aria-label="actions"
								onClick={() => onActionClick(order)}
							>
								<MoreVertIcon />
							</IconButton>
						</Stack>
					</Box>
				</Card>
			))}
		</Stack>
	);
}
