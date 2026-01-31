import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";

function App() {
	const [currentPage, setCurrentPage] = useState(0);

	return (
		<Box sx={{ pb: 7 }}>
			{/* Page content */}
			{currentPage === 0 && <HomePage />}
			{currentPage === 1 && <OrdersPage />}

			{/* Bottom Navigation */}
			<BottomNavigation
				value={currentPage}
				onChange={(_, newValue) => setCurrentPage(newValue)}
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
				<BottomNavigationAction label="Orders" icon={<ShoppingCartIcon />} />
			</BottomNavigation>
		</Box>
	);
}

export default App;
