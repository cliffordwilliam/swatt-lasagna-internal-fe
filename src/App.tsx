import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import ItemEditPage from "./pages/items/ItemEditPage";
import ItemsPage from "./pages/items/ItemsPage";
import OrdersPage from "./pages/orders/OrdersPage";

function AppContent() {
	const navigate = useNavigate();
	const location = useLocation();

	const getPageIndex = (pathname: string) => {
		switch (pathname) {
			case "/orders":
				return 0;
			case "/items":
				return 1;
			default:
				return 0;
		}
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
				<Box sx={{ pb: 7 }}>
					<Box
						sx={{
							position: "fixed",
							top: 16,
							right: 16,
							zIndex: 1000,
						}}
					>
						<UserButton />
					</Box>
					<Routes>
						<Route path="/orders" element={<OrdersPage />} />
						<Route path="/items" element={<ItemsPage />} />
						<Route path="/items/:id/edit" element={<ItemEditPage />} />
						<Route path="*" element={<Navigate to="/orders" replace />} />
					</Routes>
					<BottomNavigation
						value={getPageIndex(location.pathname)}
						onChange={handleNavigationChange}
						showLabels
						sx={{
							position: "fixed",
							bottom: 0,
							left: 0,
							right: 0,
							borderTop: 1,
							borderColor: "divider",
						}}
					>
						<BottomNavigationAction
							label="Orders"
							icon={<ShoppingCartIcon />}
						/>
						<BottomNavigationAction label="Items" icon={<InventoryIcon />} />
					</BottomNavigation>
				</Box>
			</SignedIn>
		</>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}

export default App;
