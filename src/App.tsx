import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
	AppBar,
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Paper,
	Toolbar,
	Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import ItemCreatePage from "./pages/items/ItemCreatePage";
import ItemEditPage from "./pages/items/ItemEditPage";
import ItemsPage from "./pages/items/ItemsPage";
import OrderCreatePage from "./pages/orders/OrderCreatePage";
import OrdersPage from "./pages/orders/OrdersPage";

function AppContent() {
	const navigate = useNavigate();
	const location = useLocation();

	const getPageIndex = (pathname: string) => {
		if (pathname.startsWith("/items")) return 1;
		if (pathname.startsWith("/orders")) return 0;
		return 0;
	};

	const handleNavigationChange = (
		_: React.SyntheticEvent,
		newValue: number,
	) => {
		switch (newValue) {
			case 0:
				navigate("/orders");
				break;
			case 1:
				navigate("/items");
				break;
		}
	};

	return (
		<>
			<SignedOut>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						minHeight: "100vh",
					}}
				>
					<SignIn />
				</Box>
			</SignedOut>
			<SignedIn>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh",
					}}
				>
					<Box sx={{ pt: 7, flexShrink: 0 }} />
					<AppBar position="fixed">
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Swatt Lasagna
							</Typography>
							<UserButton />
						</Toolbar>
					</AppBar>
					<Box
						sx={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							minHeight: 0,
						}}
					>
						<Routes>
							<Route path="/orders" element={<OrdersPage />} />
							<Route path="/orders/create" element={<OrderCreatePage />} />
							<Route path="/items" element={<ItemsPage />} />
							<Route path="/items/create" element={<ItemCreatePage />} />
							<Route path="/items/:id/edit" element={<ItemEditPage />} />
							<Route path="*" element={<Navigate to="/orders" replace />} />
						</Routes>
					</Box>
					<Box sx={{ pb: 7, flexShrink: 0 }} />
					<Paper
						sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
						elevation={3}
					>
						<BottomNavigation
							value={getPageIndex(location.pathname)}
							onChange={handleNavigationChange}
							showLabels
						>
							<BottomNavigationAction
								label="Orders"
								icon={<ShoppingCartIcon />}
							/>
							<BottomNavigationAction label="Items" icon={<InventoryIcon />} />
						</BottomNavigation>
					</Paper>
				</Box>
			</SignedIn>
		</>
	);
}

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<BrowserRouter>
				<AppContent />
			</BrowserRouter>
		</LocalizationProvider>
	);
}

export default App;
