import * as Yup from "yup";
import { TransactionForm, TRANSACTION_STATUS } from "../../../../types";

export const initialValues: TransactionForm = {
  quantity: 0,
  remarks: "",
  status: "",
  release_slip_num: "",
  materials_issuance_num: "",
  gate_pass_num: "",
  senderId: "",
  receiverId: "",
  itemId: "",
  projectId: "",
};

export const validationSchema = Yup.object().shape({
  quantity: Yup.number().required("Required").positive().integer(),
  remarks: Yup.string(),
  status: Yup.string().required("Required"),
  release_slip_num: Yup.string().required("Required"),
  materials_issuance_num: Yup.string().required("Required"),
  gate_pass_num: Yup.string().required("Required"),
  senderId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  receiverId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  itemId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  projectId: Yup.string().required("Required").uuid("Must be a valid UUID"),
});
