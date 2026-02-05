import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
	Container,
	Fab,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../api/orders";
import { OrderActionsDrawer } from "../../components/orders/OrderActionsDrawer";
import { OrdersList } from "../../components/orders/OrdersList";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { useOrders } from "./useOrders";

function OrdersPage() {
	const navigate = useNavigate();
	const { orders, loading, error } = useOrders();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleActionClick = (order: Order) => {
		setSelectedOrder(order);
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	const handleView = () => {
		if (selectedOrder) {
			navigate(`/orders/${selectedOrder.id}`);
		}
		setDrawerOpen(false);
	};

	const handleUpdate = () => {
		if (selectedOrder) {
			navigate(`/orders/${selectedOrder.id}/edit`);
		}
		setDrawerOpen(false);
	};

	const filteredOrders = orders.filter(
		(order) =>
			order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.recipient_name?.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	if (loading) return <PageLoading />;
	if (error) {
		return <PageError title="Orders" message={error} />;
	}

	return (
		<Container sx={{ py: 4, pb: 11 }}>
			<Typography variant="h4" gutterBottom>
				Orders
			</Typography>

			<TextField
				id="search-orders"
				placeholder="Search by order number or recipient"
				variant="outlined"
				fullWidth
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					},
				}}
				sx={{ mb: 3 }}
			/>

			{filteredOrders.length === 0 ? (
				<Typography>No orders found.</Typography>
			) : (
				<OrdersList orders={filteredOrders} onActionClick={handleActionClick} />
			)}

			<Fab
				sx={{
					position: "fixed",
					bottom: 72,
					right: 16,
				}}
				color="primary"
				aria-label="Add"
				onClick={() => navigate("/orders/create")}
			>
				<AddIcon />
			</Fab>

			<OrderActionsDrawer
				open={drawerOpen}
				onClose={handleDrawerClose}
				onView={handleView}
				onUpdate={handleUpdate}
			/>
		</Container>
	);
}

export default OrdersPage;
