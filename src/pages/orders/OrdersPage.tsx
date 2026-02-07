import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
	Box,
	Container,
	Fab,
	InputAdornment,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ListOrdersParams, Order } from "../../api/orders";
import { OrderActionsDrawer } from "../../components/orders/OrderActionsDrawer";
import { OrdersList } from "../../components/orders/OrdersList";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { useOrderOptions } from "./useOrderOptions";
import { useOrders } from "./useOrders";

function OrdersPage() {
	const navigate = useNavigate();
	const { orderStatuses } = useOrderOptions();

	const [orderNumber, setOrderNumber] = useState("");
	const [orderDateFrom, setOrderDateFrom] = useState<string | null>(null);
	const [orderDateTo, setOrderDateTo] = useState<string | null>(null);
	const [orderStatusId, setOrderStatusId] = useState<number | "">("");

	const filters: ListOrdersParams = useMemo(() => {
		const f: ListOrdersParams = {};
		if (orderNumber.trim()) f.order_number = orderNumber.trim();
		if (orderDateFrom) {
			f.order_date_from = dayjs(orderDateFrom).startOf("day").toISOString();
		}
		if (orderDateTo) {
			f.order_date_to = dayjs(orderDateTo).endOf("day").toISOString();
		}
		if (orderStatusId !== "") f.order_status_id = orderStatusId as number;
		return f;
	}, [orderNumber, orderDateFrom, orderDateTo, orderStatusId]);

	const { orders, loading, error } = useOrders(filters);
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

	const handleStatusChange = (
		_event: React.MouseEvent<HTMLElement>,
		newValue: number | "",
	) => {
		setOrderStatusId(newValue ?? "");
	};

	if (loading) return <PageLoading />;
	if (error) {
		return <PageError title="Orders" message={error} />;
	}

	return (
		<Container sx={{ py: 4, pb: 11 }}>
			<Typography variant="h4" gutterBottom>
				Orders
			</Typography>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
				<TextField
					id="filter-order-number"
					placeholder="Order number"
					variant="outlined"
					fullWidth
					value={orderNumber}
					onChange={(e) => setOrderNumber(e.target.value)}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						},
					}}
				/>
				<DatePicker
					label="Order date from"
					value={orderDateFrom ? dayjs(orderDateFrom) : null}
					onChange={(newValue) => {
						setOrderDateFrom(newValue ? newValue.format("YYYY-MM-DD") : null);
					}}
					slotProps={{
						textField: {
							fullWidth: true,
						},
					}}
				/>
				<DatePicker
					label="Order date to"
					value={orderDateTo ? dayjs(orderDateTo) : null}
					onChange={(newValue) => {
						setOrderDateTo(newValue ? newValue.format("YYYY-MM-DD") : null);
					}}
					slotProps={{
						textField: {
							fullWidth: true,
						},
					}}
				/>
				<Box>
					<ToggleButtonGroup
						color="primary"
						value={orderStatusId}
						exclusive
						onChange={handleStatusChange}
						aria-label="Order status"
						fullWidth
					>
						<ToggleButton value="" aria-label="All">
							All
						</ToggleButton>
						{orderStatuses.map((status) => (
							<ToggleButton
								key={status.id}
								value={status.id}
								aria-label={status.name}
							>
								{status.name}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</Box>
			</Box>

			{orders.length === 0 ? (
				<Typography>No orders found.</Typography>
			) : (
				<OrdersList orders={orders} onActionClick={handleActionClick} />
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
