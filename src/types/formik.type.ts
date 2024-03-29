import { TRANSACTION_STATUS, UNIT, ROLES } from "./enum.type";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type TransactionForm = {
  id?: string;
  quantity?: number;
  remarks?: string | null;
  status: TRANSACTION_STATUS | string;
  release_slip_num?: string;
  materials_issuance_num?: string;
  gate_pass_num?: string;
  senderId?: string;
  receiverId?: string;
  itemId?: string;
  projectId?: string;
};

export type ItemForm = {
  id?: string;
  name: string;
  referalId: string;
  description: string | null;
  model: string | null;
  unit: UNIT | string;
  quantity: number;
  price: number;
  pictureUrl: any;
  pictureUrlTemp?: string;
  // pictureObj: ;
  categoryId: string;
  brandId: string;
};

export type ProjectForm = {
  id?: string;
  name: string;
  address: string;
  userId: string;
  status?: string;
};

export type CategoryForm = {
  id?: string;
  name: string;
  // image: any;
};

export type BrandForm = {
  id?: string;
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
