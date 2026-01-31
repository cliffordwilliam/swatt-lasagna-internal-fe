import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import {
	BrowserRouter,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/items/ItemsPage";
import OrdersPage from "./pages/OrdersPage";

function AppContent() {
	const navigate = useNavigate();
	const location = useLocation();

	const getPageIndex = (pathname: string) => {
		switch (pathname) {
			case "/":
				return 0;
			case "/orders":
				return 1;
			case "/items":
				return 2;
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
				navigate("/");
				break;
			case 1:
				navigate("/orders");
				break;
			case 2:
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
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/orders" element={<OrdersPage />} />
						<Route path="/items" element={<ItemsPage />} />
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
						<BottomNavigationAction label="Home" icon={<HomeIcon />} />
						<BottomNavigationAction
							label="Orders"
							icon={<ShoppingCartIcon />}
						/>
						<BottomNavigationAction label="Items" icon={<InventoryIcon />} />
						<UserButton />
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
