import { TRANSACTION_STATUS } from "./enum.type";

export type LoginFormValues = {
	email: string;
	password: string;
};

export type TransactionCreateForm = {
	quantity: string;
	remarks: string;
	status: TRANSACTION_STATUS;
	release_slip_num: string;
	materials_issuance_num: string;
	gate_pass_num: string;
	userId: string;
	itemId: string;
	projectId: string;
};
