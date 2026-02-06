export type OrderSummaryCartItem = {
	item: { price: number };
	quantity: number;
};

export function calculateSubtotal(cartItems: OrderSummaryCartItem[]): number {
	return cartItems.reduce(
		(sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
		0,
	);
}

export function calculateTotal(subtotal: number, shipping: number): number {
	return subtotal + shipping;
}
