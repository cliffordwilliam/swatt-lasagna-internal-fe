import { Container, Stack, Typography } from "@mui/material";
import { TodaysDeliveriesList } from "../../components/orders/TodaysDeliveriesList";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { StatCard } from "../../components/ui/StatCard";
import { formatIDR } from "../../utils/money";
import { useDashboard } from "./useDashboard";

function DashboardPage() {
	const { data, loading, error } = useDashboard();

	if (loading) return <PageLoading />;
	if (error) return <PageError message={error} />;
	if (!data) return null;

	const { summary, todays_deliveries } = data;

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Dashboard
			</Typography>
			<Stack spacing={3}>
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
				<Stack spacing={1}>
					<Typography variant="h5" component="h2">
						Today&apos;s deliveries
					</Typography>
					<TodaysDeliveriesList deliveries={todays_deliveries} />
				</Stack>
			</Stack>
		</Container>
	);
}

export default DashboardPage;
