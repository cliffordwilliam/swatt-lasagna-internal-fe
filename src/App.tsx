import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";

function App() {
	const [currentPage, setCurrentPage] = useState(0);

	return (
		<header>
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
					{currentPage === 0 && <HomePage />}
					{currentPage === 1 && <OrdersPage />}
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
						<BottomNavigationAction
							label="Orders"
							icon={<ShoppingCartIcon />}
						/>
						<UserButton />
					</BottomNavigation>
				</Box>
			</SignedIn>
		</header>
	);
}

export default App;
