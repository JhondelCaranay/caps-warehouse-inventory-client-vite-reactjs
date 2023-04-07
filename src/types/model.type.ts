export type WidgetDataTypes = {
  title: string;
  isMoney: boolean;
  link: string;
  url: string;
  icon: JSX.Element;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

// signin use in feature auth redux
export type Signin = {
  email: string;
  password: string;
};

export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type Brand = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type Item = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  model: string;
  unit: string;
  quantity: number;
  price: number;
  pictureUrl: string;
  categoryId: string;
  brandId: string;
  Category: Category;
  Brand: Brand;
};

export type Project = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
  userId: string;
  status: string;
  User: User;
};

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  status: string;
  role: string;
  profileId: string;
  isNeedChangePassword: boolean;
  Profile: {
    id: string;
    first_name: string;
    last_name: string;
    position: string;
    address: string;
    contact: string;
    avatarUrl: string;
  };
};

export type Transaction = {
  id: string;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  status: string;
  remarks: string;
  release_slip_num: string;
  materials_issuance_num: string;
  gate_pass_num: string;
  return_slip_num: string;
  itemId: string;
  projectId: string;
  senderId: string;
  receiverId: string;
  Item: Item;
  Project: Project;
  Sender: User;
  Receiver: User;
};
