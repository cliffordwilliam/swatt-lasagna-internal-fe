import type React from "react";
import { useCallback, useState } from "react";
import type { CreateOrderInput } from "../types/order";

interface CreateOrderFormProps {
	onSubmitOrder: (data: CreateOrderInput) => Promise<void>;
}

const CreateOrderForm: React.FC<CreateOrderFormProps> = ({ onSubmitOrder }) => {
	const [orderNumber, setOrderNumber] = useState<string>("");
	const [orderDate, setOrderDate] = useState<string>(new Date().toISOString());
	const [deliveryDate, setDeliveryDate] = useState<string>(
		new Date().toISOString(),
	);
	const [buyerName, setBuyerName] = useState<string>("");
	const [recipientName, setRecipientName] = useState<string>("");
	const [deliveryMethodId, setDeliveryMethodId] = useState<number>(1);
	const [paymentMethodId, setPaymentMethodId] = useState<number>(1);
	const [orderStatusId, setOrderStatusId] = useState<number>(1);
	const [shippingCost, setShippingCost] = useState<number>(0);
	const [note, setNote] = useState<string>("");
	const [itemId, setItemId] = useState<number>(1);
	const [quantity, setQuantity] = useState<number>(1);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const handleFormChange = useCallback(
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>,
		) => {
			const { name, value } = e.target;

			switch (name) {
				case "order_number":
					setOrderNumber(value);
					break;
				case "buyer.name":
					setBuyerName(value);
					break;
				case "recipient.name":
					setRecipientName(value);
					break;
				case "delivery_method_id":
					setDeliveryMethodId(Number(value));
					break;
				case "payment_method_id":
					setPaymentMethodId(Number(value));
					break;
				case "order_status_id":
					setOrderStatusId(Number(value));
					break;
				case "shipping_cost":
					setShippingCost(Number(value));
					break;
				case "item_id":
					setItemId(Number(value));
					break;
				case "quantity":
					setQuantity(Number(value));
					break;
				case "note":
					setNote(value);
					break;
				default:
					break;
			}
		},
		[],
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const formData: CreateOrderInput = {
				order_number: orderNumber,
				order_date: orderDate,
				delivery_date: deliveryDate,
				buyer: { name: buyerName },
				recipient: { name: recipientName },
				delivery_method_id: deliveryMethodId,
				payment_method_id: paymentMethodId,
				order_status_id: orderStatusId,
				shipping_cost: shippingCost,
				note: note,
				items: [{ item_id: itemId, quantity: quantity }],
			};
			await onSubmitOrder(formData);
			setOrderNumber("");
			setBuyerName("");
			setRecipientName("");
			setDeliveryMethodId(1);
			setPaymentMethodId(1);
			setOrderStatusId(1);
			setShippingCost(0);
			setNote("");
			setItemId(1);
			setQuantity(1);
			setOrderDate(new Date().toISOString());
			setDeliveryDate(new Date().toISOString());
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<h2>Create New Order</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="order_number">Order Number:</label>
					<input
						type="text"
						id="order_number"
						name="order_number"
						value={orderNumber}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="buyer.name">Buyer Name:</label>
					<input
						type="text"
						id="buyer.name"
						name="buyer.name"
						value={buyerName}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="recipient.name">Recipient Name:</label>
					<input
						type="text"
						id="recipient.name"
						name="recipient.name"
						value={recipientName}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="delivery_method_id">Delivery Method ID:</label>
					<input
						type="number"
						id="delivery_method_id"
						name="delivery_method_id"
						value={deliveryMethodId}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="payment_method_id">Payment Method ID:</label>
					<input
						type="number"
						id="payment_method_id"
						name="payment_method_id"
						value={paymentMethodId}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="order_status_id">Order Status ID:</label>
					<input
						type="number"
						id="order_status_id"
						name="order_status_id"
						value={orderStatusId}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="shipping_cost">Shipping Cost:</label>
					<input
						type="number"
						id="shipping_cost"
						name="shipping_cost"
						value={shippingCost}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="item_id">Item ID (first item):</label>
					<input
						type="number"
						id="item_id"
						name="item_id"
						value={itemId}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="quantity">Quantity (first item):</label>
					<input
						type="number"
						id="quantity"
						name="quantity"
						value={quantity}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="note">Note:</label>
					<textarea
						id="note"
						name="note"
						value={note}
						onChange={handleFormChange}
					></textarea>
				</div>
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Creating Order..." : "Create Order"}
				</button>
			</form>
		</div>
	);
};

export default CreateOrderForm;
