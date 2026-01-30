import React, {
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { getOrders } from "../api/orders";
import type { OrderRow } from "../types/order";
import OrderItem from "./OrderItem";

export interface OrderListRef {
	fetchOrders: () => Promise<void>;
}

type OrderListProps = {};

const OrderList = React.forwardRef<OrderListRef, OrderListProps>(
	(_props, ref) => {
		const [orders, setOrders] = useState<OrderRow[]>([]);
		const [loading, setLoading] = useState<boolean>(true);
		const [error, setError] = useState<string | null>(null);

		const fetchOrders = useCallback(async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await getOrders();
				setOrders(data);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		}, []);

		useImperativeHandle(ref, () => ({
			fetchOrders,
		}));

		useEffect(() => {
			fetchOrders();
		}, [fetchOrders]);

		if (error) {
			return <div>Error: {error}</div>;
		}

		return (
			<div>
				<h2>Order List</h2>
				{loading && <p>Loading orders...</p>}
				{!loading && orders.length === 0 && <p>No orders found.</p>}

				{!loading && orders.length > 0 && (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Order Number</th>
								<th>Order Date</th>
								<th>Delivery Date</th>
								<th>Buyer Name</th>
								<th>Recipient Name</th>
								<th>Total Amount</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<OrderItem key={order.id} order={order} />
							))}
						</tbody>
					</table>
				)}
			</div>
		);
	},
);

export default OrderList;
