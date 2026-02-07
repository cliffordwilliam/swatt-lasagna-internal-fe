import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { PageError } from "../../components/ui/PageError";
import { PageLoading } from "../../components/ui/PageLoading";
import { formatIDR } from "../../utils/money";
import { useDashboard } from "./useDashboard";

function DashboardPage() {
	const { data, loading, error } = useDashboard();

	if (loading) return <PageLoading />;
	if (error) return <PageError message={error} />;
	if (!data) return null;

	const { summary } = data;

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Dashboard
			</Typography>
			<Grid container spacing={2}>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<Card>
						<CardContent>
							<Typography
								color="text.secondary"
								gutterBottom
								sx={{ fontSize: 14 }}
							>
								Total Orders
							</Typography>
							<Typography variant="h5" component="div">
								{summary.total_orders}
							</Typography>
							<Typography color="text.secondary">Last 30 days</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<Card>
						<CardContent>
							<Typography
								color="text.secondary"
								gutterBottom
								sx={{ fontSize: 14 }}
							>
								Total Revenue
							</Typography>
							<Typography variant="h5" component="div">
								{formatIDR(summary.total_revenue)}
							</Typography>
							<Typography color="text.secondary">Last 30 days</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<Card>
						<CardContent>
							<Typography
								color="text.secondary"
								gutterBottom
								sx={{ fontSize: 14 }}
							>
								Pending Revenue
							</Typography>
							<Typography variant="h5" component="div">
								{formatIDR(summary.pending_revenue)}
							</Typography>
							<Typography color="text.secondary">Last 30 days</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<Card>
						<CardContent>
							<Typography
								color="text.secondary"
								gutterBottom
								sx={{ fontSize: 14 }}
							>
								Average Order Value
							</Typography>
							<Typography variant="h5" component="div">
								{formatIDR(summary.avg_order_value)}
							</Typography>
							<Typography color="text.secondary">Last 30 days</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}

export default DashboardPage;
