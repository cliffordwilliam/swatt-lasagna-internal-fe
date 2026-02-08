import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Container,
	Stack,
	Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { RecentOrdersList } from "../../components/orders/RecentOrdersList";
import { TodaysDeliveriesList } from "../../components/orders/TodaysDeliveriesList";
import { UpcomingDeliveriesList } from "../../components/orders/UpcomingDeliveriesList";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { StatCard } from "../../components/ui/StatCard";
import { formatDateShort } from "../../utils/date";
import { formatIDR, formatIDRShort } from "../../utils/money";
import { getOrderStatusColor } from "../../utils/orderStatus";
import { useDashboard } from "./useDashboard";

function DashboardPage() {
	const { data, loading, error } = useDashboard();

	if (loading) return <PageLoading />;
	if (error) return <PageError message={error} />;
	if (!data) return null;

	const {
		summary,
		todays_deliveries,
		recent_orders,
		revenue_trend,
		top_items,
		status_breakdown,
		upcoming_deliveries,
	} = data;

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Dashboard
			</Typography>
			<Stack spacing={3}>
				{/* 1. Summary Stats */}
				<Stack spacing={2}>
					<StatCard title="Total Orders" value={summary.total_orders} />
					<StatCard
						title="Total Revenue"
						value={formatIDR(summary.total_revenue)}
					/>
					<StatCard
						title="Pending Revenue"
						value={formatIDR(summary.pending_revenue)}
					/>
					<StatCard
						title="Average Order Value"
						value={formatIDR(summary.avg_order_value)}
					/>
				</Stack>

				{/* 2. Today's Deliveries */}
				<Stack spacing={1}>
					<Typography variant="h5" component="h2">
						Today&apos;s deliveries
					</Typography>
					<TodaysDeliveriesList deliveries={todays_deliveries} />
				</Stack>

				{/* 3. Revenue Trend Chart */}
				{revenue_trend.length > 0 && (
					<Stack spacing={1}>
						<Typography variant="h5" component="h2">
							Revenue trend
						</Typography>
						<LineChart
							xAxis={[
								{
									id: "revenueTrendDates",
									data: revenue_trend.map((p) => formatDateShort(p.date)),
									scaleType: "point",
								},
							]}
							yAxis={[
								{
									valueFormatter: (value: unknown) =>
										formatIDRShort(Number(value)),
								},
							]}
							series={[
								{
									data: revenue_trend.map((p) => p.revenue),
									valueFormatter: (value: unknown) =>
										formatIDRShort(Number(value)),
								},
							]}
							height={300}
						/>
					</Stack>
				)}

				{/* 4. Recent Orders */}
				<Stack spacing={1}>
					<Typography variant="h5" component="h2">
						Recent orders
					</Typography>
					<RecentOrdersList orders={recent_orders} />
				</Stack>

				{/* 5. Top Items (accordion) */}
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="top-items-content"
						id="top-items-header"
					>
						<Typography component="span">Top items</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{top_items.length > 0 ? (
							<Stack
								direction="row"
								flexWrap="wrap"
								useFlexGap
								spacing={2}
								sx={{ "& > *": { minWidth: 180, flex: "1 1 180px" } }}
							>
								{top_items.map((item) => (
									<StatCard
										key={item.item_name}
										title={item.item_name}
										value={formatIDR(item.total_sales)}
										subtitle={`${item.total_quantity} sold`}
									/>
								))}
							</Stack>
						) : (
							<Typography color="text.secondary">No top items.</Typography>
						)}
					</AccordionDetails>
				</Accordion>

				{/* 6. Status Breakdown (accordion) */}
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="status-breakdown-content"
						id="status-breakdown-header"
					>
						<Typography component="span">Status breakdown</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{status_breakdown.length > 0 ? (
							<Stack
								direction="row"
								flexWrap="wrap"
								useFlexGap
								spacing={2}
								sx={{ "& > *": { minWidth: 180, flex: "1 1 180px" } }}
							>
								{status_breakdown.map((item) => (
									<StatCard
										key={item.status}
										title={item.status}
										value={formatIDR(item.total_amount)}
										subtitle={`${item.count} orders (${item.percentage}%)`}
										titleColor={getOrderStatusColor(item.status)}
									/>
								))}
							</Stack>
						) : (
							<Typography color="text.secondary">
								No status breakdown.
							</Typography>
						)}
					</AccordionDetails>
				</Accordion>

				{/* 7. Upcoming Deliveries (accordion) */}
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="upcoming-deliveries-content"
						id="upcoming-deliveries-header"
					>
						<Typography component="span">Upcoming deliveries</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<UpcomingDeliveriesList deliveries={upcoming_deliveries} />
					</AccordionDetails>
				</Accordion>
			</Stack>
		</Container>
	);
}

export default DashboardPage;
