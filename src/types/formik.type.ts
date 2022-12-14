import { TRANSACTION_STATUS, UNIT, ROLES } from "./enum.type";

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

export type ItemCreateForm = {
  name: string;
  description: string | null;
  model: string | null;
  unit: UNIT | string;
  quantity: number;
  price: number;
  pictureUrl: any;
  // pictureObj: ;
  categoryId: string;
  brandId: string;
};

export type ProjectCreateForm = {
  name: string;
  address: string;
  userId: string;
};

export type CategoryCreateForm = {
  name: string;
};

export type BrandCreateForm = {
  name: string;
};

export type UserCreateForm = {
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  address: string | null;
  contact: string | null;
  avatarUrl: any;
  status: string | null;
  role: ROLES | string;
};
