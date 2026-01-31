import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import type { Item } from "../../api/items";
import { formatIDR } from "../../utils/money";

interface Props {
	items: Item[];
}

export function ItemsTable({ items }: Props) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="items table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item) => (
						<TableRow
							key={item.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{item.name}
							</TableCell>
							<TableCell align="right">{formatIDR(item.price)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
