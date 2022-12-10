import { TRANSACTION_STATUS } from "./enum.type";

export type LoginFormValues = {
	email: string;
	password: string;
};

export type TransactionCreateForm = {
	quantity: number;
	remarks: string | null;
	status: TRANSACTION_STATUS;
	release_slip_num: string;
	materials_issuance_num: string;
	gate_pass_num: string;
	senderId: string;
	receiverId: string;
	itemId: string;
	projectId: string;
};
