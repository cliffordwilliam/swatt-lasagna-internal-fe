import { useSnackbar } from "notistack";
import type { Address } from "../../api/addresses";
import type { Person } from "../../api/persons";
import type { Phone } from "../../api/phones";
import type { CartItem } from "../../components/orders/CartItemsManager";

export interface OrderFormValidationState {
	orderNumber: string;
	orderDate: string;
	deliveryDate: string;
	buyer: Person | null;
	buyerPhone: Phone | null;
	buyerAddress: Address | null;
	recipient: Person | null;
	recipientPhone: Phone | null;
	recipientAddress: Address | null;
	deliveryMethodId: number | null;
	paymentMethodId: number | null;
	orderStatusId: number | null;
	cartItems: CartItem[];
}

export function useOrderFormValidation() {
	const { enqueueSnackbar } = useSnackbar();

	return function validateOrderForm(form: OrderFormValidationState): boolean {
		if (!form.orderNumber || !form.orderDate || !form.deliveryDate) {
			enqueueSnackbar("Please fill in all required fields", {
				variant: "error",
			});
			return false;
		}

		if (!form.buyer || !form.buyerPhone || !form.buyerAddress) {
			enqueueSnackbar("Please select buyer, buyer phone, and buyer address", {
				variant: "error",
			});
			return false;
		}

		if (!form.recipient || !form.recipientPhone || !form.recipientAddress) {
			enqueueSnackbar(
				"Please select recipient, recipient phone, and recipient address",
				{ variant: "error" },
			);
			return false;
		}

		if (
			form.deliveryMethodId === null ||
			form.paymentMethodId === null ||
			form.orderStatusId === null
		) {
			enqueueSnackbar(
				"Please select delivery method, payment method, and order status",
				{ variant: "error" },
			);
			return false;
		}

		if (form.cartItems.length === 0) {
			enqueueSnackbar("Please add at least one item to the order", {
				variant: "error",
			});
			return false;
		}

		return true;
	};
}
