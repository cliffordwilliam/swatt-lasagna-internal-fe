import type { ChipProps } from "@mui/material/Chip";

export function getOrderStatusColor(statusName: string): ChipProps["color"] {
	switch (statusName.toLowerCase()) {
		case "belum bayar":
			return "warning";
		case "downpayment":
			return "info";
		case "lunas":
			return "success";
		default:
			return "default";
	}
}
