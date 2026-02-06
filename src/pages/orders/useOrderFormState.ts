import { useEffect, useState } from "react";
import type { Address } from "../../api/addresses";
import type { OrderDetail } from "../../api/orders";
import type { Person } from "../../api/persons";
import type { Phone } from "../../api/phones";
import type { CartItem } from "../../components/orders/CartItemsManager";
import { formatIDR } from "../../utils/money";
import { calculateSubtotal, calculateTotal } from "../../utils/orderSummary";
import { parseIntFromFormatted } from "../../utils/string";
import { useAddressDrawer } from "./useAddressDrawer";
import { useOptionDrawer } from "./useOptionDrawer";
import { useOrderOptions } from "./useOrderOptions";
import { usePersonDrawer } from "./usePersonDrawer";
import { usePhoneDrawer } from "./usePhoneDrawer";

export interface OrderFormState {
	orderNumber: string;
	orderDate: string;
	deliveryDate: string;
	shippingCost: string;
	note: string;
	buyer: Person | null;
	recipient: Person | null;
	buyerPhone: Phone | null;
	recipientPhone: Phone | null;
	buyerAddress: Address | null;
	recipientAddress: Address | null;
	deliveryMethodId: number | null;
	paymentMethodId: number | null;
	orderStatusId: number | null;
	cartItems: CartItem[];
}

export interface OrderFormStateSetters {
	setOrderNumber: (v: string) => void;
	setOrderDate: (v: string) => void;
	setDeliveryDate: (v: string) => void;
	setShippingCost: (v: string) => void;
	setNote: (v: string) => void;
	setBuyer: (v: Person | null) => void;
	setRecipient: (v: Person | null) => void;
	setBuyerPhone: (v: Phone | null) => void;
	setRecipientPhone: (v: Phone | null) => void;
	setBuyerAddress: (v: Address | null) => void;
	setRecipientAddress: (v: Address | null) => void;
	setDeliveryMethodId: (v: number | null) => void;
	setPaymentMethodId: (v: number | null) => void;
	setOrderStatusId: (v: number | null) => void;
	setCartItems: (v: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void;
}

export interface OrderFormSummary {
	subtotal: number;
	shipping: number;
	total: number;
}

export interface OrderFormStateReturn
	extends OrderFormState,
		OrderFormStateSetters {
	deliveryMethods: ReturnType<typeof useOrderOptions>["deliveryMethods"];
	paymentMethods: ReturnType<typeof useOrderOptions>["paymentMethods"];
	orderStatuses: ReturnType<typeof useOrderOptions>["orderStatuses"];
	summary: OrderFormSummary;
	buyerPersonDrawer: ReturnType<typeof usePersonDrawer>;
	recipientPersonDrawer: ReturnType<typeof usePersonDrawer>;
	buyerPhoneDrawer: ReturnType<typeof usePhoneDrawer>;
	recipientPhoneDrawer: ReturnType<typeof usePhoneDrawer>;
	buyerAddressDrawer: ReturnType<typeof useAddressDrawer>;
	recipientAddressDrawer: ReturnType<typeof useAddressDrawer>;
	deliveryDrawer: ReturnType<typeof useOptionDrawer>;
	paymentDrawer: ReturnType<typeof useOptionDrawer>;
	statusDrawer: ReturnType<typeof useOptionDrawer>;
}

export function useOrderFormState(
	order: OrderDetail | null,
): OrderFormStateReturn {
	const { deliveryMethods, paymentMethods, orderStatuses } = useOrderOptions();

	const [orderNumber, setOrderNumber] = useState("");
	const [orderDate, setOrderDate] = useState("");
	const [deliveryDate, setDeliveryDate] = useState("");
	const [shippingCost, setShippingCost] = useState("");
	const [note, setNote] = useState("");
	const [buyer, setBuyer] = useState<Person | null>(null);
	const [recipient, setRecipient] = useState<Person | null>(null);
	const [buyerPhone, setBuyerPhone] = useState<Phone | null>(null);
	const [recipientPhone, setRecipientPhone] = useState<Phone | null>(null);
	const [buyerAddress, setBuyerAddress] = useState<Address | null>(null);
	const [recipientAddress, setRecipientAddress] = useState<Address | null>(
		null,
	);
	const [deliveryMethodId, setDeliveryMethodId] = useState<number | null>(null);
	const [paymentMethodId, setPaymentMethodId] = useState<number | null>(null);
	const [orderStatusId, setOrderStatusId] = useState<number | null>(null);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	// Sync form state from order (edit mode)
	useEffect(() => {
		if (order) {
			setOrderNumber(order.order_number);
			setOrderDate(order.order_date.split("T")[0]);
			setDeliveryDate(order.delivery_date.split("T")[0]);
			setShippingCost(formatIDR(order.shipping_cost));
			setNote(order.note || "");
			setDeliveryMethodId(order.delivery_method_id);
			setPaymentMethodId(order.payment_method_id);
			setOrderStatusId(order.order_status_id);

			setBuyer({ id: order.buyer.id, name: order.buyer.name });
			setBuyerPhone({
				id: order.buyer.phone.id,
				phone_number: order.buyer.phone.phone_number,
			});
			setBuyerAddress({
				id: order.buyer.address.id,
				address: order.buyer.address.address,
			});

			setRecipient({ id: order.recipient.id, name: order.recipient.name });
			setRecipientPhone({
				id: order.recipient.phone.id,
				phone_number: order.recipient.phone.phone_number,
			});
			setRecipientAddress({
				id: order.recipient.address.id,
				address: order.recipient.address.address,
			});

			const mappedCartItems: CartItem[] = order.items.map((orderItem) => ({
				item: {
					id: orderItem.item_id,
					name: orderItem.item_name,
					price: orderItem.item_price,
				},
				quantity: orderItem.quantity,
			}));
			setCartItems(mappedCartItems);
		}
	}, [order]);

	// Default to first option when options load (create mode)
	useEffect(() => {
		if (
			order === null &&
			deliveryMethods.length > 0 &&
			deliveryMethodId === null
		) {
			setDeliveryMethodId(deliveryMethods[0].id);
		}
	}, [order, deliveryMethods, deliveryMethodId]);
	useEffect(() => {
		if (
			order === null &&
			paymentMethods.length > 0 &&
			paymentMethodId === null
		) {
			setPaymentMethodId(paymentMethods[0].id);
		}
	}, [order, paymentMethods, paymentMethodId]);
	useEffect(() => {
		if (order === null && orderStatuses.length > 0 && orderStatusId === null) {
			setOrderStatusId(orderStatuses[0].id);
		}
	}, [order, orderStatuses, orderStatusId]);

	const buyerPersonDrawer = usePersonDrawer(buyer, (person) => {
		setBuyer(person);
		setBuyerPhone(null);
		setBuyerAddress(null);
	});
	const recipientPersonDrawer = usePersonDrawer(recipient, (person) => {
		setRecipient(person);
		setRecipientPhone(null);
		setRecipientAddress(null);
	});

	const buyerPhoneDrawer = usePhoneDrawer(
		buyer?.id ?? null,
		buyerPhone,
		setBuyerPhone,
	);
	const recipientPhoneDrawer = usePhoneDrawer(
		recipient?.id ?? null,
		recipientPhone,
		setRecipientPhone,
	);

	const buyerAddressDrawer = useAddressDrawer(
		buyer?.id ?? null,
		buyerAddress,
		setBuyerAddress,
	);
	const recipientAddressDrawer = useAddressDrawer(
		recipient?.id ?? null,
		recipientAddress,
		setRecipientAddress,
	);

	const deliveryDrawer = useOptionDrawer(deliveryMethodId, setDeliveryMethodId);
	const paymentDrawer = useOptionDrawer(paymentMethodId, setPaymentMethodId);
	const statusDrawer = useOptionDrawer(orderStatusId, setOrderStatusId);

	const subtotal = calculateSubtotal(cartItems);
	const shipping = parseIntFromFormatted(shippingCost);
	const total = calculateTotal(subtotal, shipping);

	return {
		orderNumber,
		orderDate,
		deliveryDate,
		shippingCost,
		note,
		buyer,
		recipient,
		buyerPhone,
		recipientPhone,
		buyerAddress,
		recipientAddress,
		deliveryMethodId,
		paymentMethodId,
		orderStatusId,
		cartItems,
		setOrderNumber,
		setOrderDate,
		setDeliveryDate,
		setShippingCost,
		setNote,
		setBuyer,
		setRecipient,
		setBuyerPhone,
		setRecipientPhone,
		setBuyerAddress,
		setRecipientAddress,
		setDeliveryMethodId,
		setPaymentMethodId,
		setOrderStatusId,
		setCartItems,
		deliveryMethods,
		paymentMethods,
		orderStatuses,
		summary: { subtotal, shipping, total },
		buyerPersonDrawer,
		recipientPersonDrawer,
		buyerPhoneDrawer,
		recipientPhoneDrawer,
		buyerAddressDrawer,
		recipientAddressDrawer,
		deliveryDrawer,
		paymentDrawer,
		statusDrawer,
	};
}
