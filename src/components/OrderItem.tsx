import type React from "react";
import type { OrderRow } from "../types/order";

interface OrderItemProps {
	order: OrderRow;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
	return (
		<tr>
			<td>{order.id}</td>
			<td>{order.order_number}</td>
			<td>{order.order_date.toLocaleDateString()}</td>
			<td>{order.delivery_date.toLocaleDateString()}</td>
			<td>{order.buyer_name}</td>
			<td>{order.recipient_name}</td>
			<td>{order.total_amount.toFixed(2)}</td>
			<td>{order.order_status_id}</td>
		</tr>
	);
};

export default OrderItem;
