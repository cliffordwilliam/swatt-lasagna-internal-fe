import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type {
	DeliveryMethod,
	OrderStatus,
	PaymentMethod,
} from "../../api/orders";
import {
	listDeliveryMethods,
	listOrderStatuses,
	listPaymentMethods,
} from "../../api/orders";

export function useOrderOptions() {
	const { getToken } = useAuth();
	const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([]);
	const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
	const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				const token = await getToken();
				const [delivery, payment, status] = await Promise.all([
					listDeliveryMethods(token),
					listPaymentMethods(token),
					listOrderStatuses(token),
				]);
				setDeliveryMethods(delivery ?? []);
				setPaymentMethods(payment ?? []);
				setOrderStatuses(status ?? []);
			} catch (e) {
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [getToken]);

	return {
		deliveryMethods,
		paymentMethods,
		orderStatuses,
		loading,
		error,
	};
}
