import * as Yup from "yup";
import { TransactionCreateForm, TRANSACTION_STATUS } from "../../../types";

export const initialValues: TransactionCreateForm = {
	quantity: 1,
	remarks: "",
	status: TRANSACTION_STATUS.ON_DELIVERY,
	release_slip_num: "#RA-123456",
	materials_issuance_num: "#RA-123456",
	gate_pass_num: "#RA-123456",
	senderId: "",
	receiverId: "",
	itemId: "",
	projectId: "",
};

export const validationSchema = Yup.object().shape({
	quantity: Yup.number().required("Required").positive().integer(),
	remarks: Yup.string(),
	status: Yup.string(),
	release_slip_num: Yup.string().required("Required"),
	materials_issuance_num: Yup.string().required("Required"),
	gate_pass_num: Yup.string().required("Required"),
	senderId: Yup.string().required("Required").uuid("Must be a valid UUID"),
	receiverId: Yup.string().required("Required").uuid("Must be a valid UUID"),
	itemId: Yup.string().required("Required").uuid("Must be a valid UUID"),
	projectId: Yup.string().required("Required").uuid("Must be a valid UUID"),
});
