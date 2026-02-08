import { apiFetch } from "./http";

export interface DashboardSummary {
	total_orders: number;
	total_revenue: number;
	pending_revenue: number;
	avg_order_value: number;
}

export interface RecentOrder {
	id: number;
	order_number: string;
	order_date: string;
	recipient_name: string;
	total_amount: number;
	status: string;
}

export interface TodaysDelivery {
	id: number;
	order_number: string;
	recipient_name: string;
	recipient_phone: string;
	recipient_address: string;
	status: string;
	delivery_method: string;
}

export interface RevenueTrendPoint {
	date: string;
	order_count: number;
	revenue: number;
}

export interface TopItem {
	item_name: string;
	total_quantity: number;
	total_sales: number;
}

export interface StatusBreakdownItem {
	status: string;
	count: number;
	total_amount: number;
	percentage: number;
}

export interface UpcomingDelivery {
	delivery_day: string;
	order_count: number;
}

export interface DashboardResponse {
	summary: DashboardSummary;
	recent_orders: RecentOrder[];
	todays_deliveries: TodaysDelivery[];
	revenue_trend: RevenueTrendPoint[];
	top_items: TopItem[];
	status_breakdown: StatusBreakdownItem[];
	upcoming_deliveries: UpcomingDelivery[];
}

export function getDashboard(token: string | null) {
	return apiFetch<DashboardResponse>("/api/dashboard/", token);
}
