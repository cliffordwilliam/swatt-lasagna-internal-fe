import type React from "react";
import { useCallback, useRef, useState } from "react";
import { createOrder } from "../api/create-order";
import CreateOrderForm from "../components/CreateOrderForm";
import OrderList, { type OrderListRef } from "../components/OrderList";
import type { CreateOrderInput } from "../types/order";

const OrdersPage: React.FC = () => {
	const [createOrderError, setCreateOrderError] = useState<string | null>(null);
	const [createOrderSuccess, setCreateOrderSuccess] = useState<string | null>(
		null,
	);
	const orderListRef = useRef<OrderListRef>(null);

	const handleCreateOrder = useCallback(async (formData: CreateOrderInput) => {
		setCreateOrderError(null);
		setCreateOrderSuccess(null);
		try {
			await createOrder(formData);
			setCreateOrderSuccess("Order created successfully!");
			orderListRef.current?.fetchOrders();
		} catch (err) {
			setCreateOrderError((err as Error).message);
		}
	}, []);

	return (
		<div>
			<h1>Orders Management</h1>
			<OrderList ref={orderListRef} />
			<hr style={{ margin: "20px 0" }} />
			{createOrderSuccess && (
				<p style={{ color: "green" }}>{createOrderSuccess}</p>
			)}
			{createOrderError && <p style={{ color: "red" }}>{createOrderError}</p>}
			<CreateOrderForm onSubmitOrder={handleCreateOrder} />
		</div>
	);
};

export default OrdersPage;
