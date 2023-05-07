import {
  BrandingWatermarkOutlined,
  CategoryOutlined,
  Construction,
  Dashboard,
  Hardware,
  LocalShipping,
  PeopleOutline,
  Warehouse,
} from "@mui/icons-material";
import { ROLES } from "../../types";

export const CONTROLLER_ONLY = [ROLES.WAREHOUSE_CONTROLLER];
export const ADMINS_ONLY = [ROLES.ADMIN, ROLES.SUPER_ADMIN];
export const SUPER_ADMIN_ONLY = [ROLES.SUPER_ADMIN];
export const ENGINEER_ONLY = [ROLES.ENGINEER];

export const MainLinks = {
  to: "/dash",
  icon: <Dashboard />,
  text: "Dashboard",
};

export const adminsLinks = [
  {
    to: "/dash/transactions",
    icon: <LocalShipping />,
    text: "Transactions",
  },
  {
    to: "/dash/items",
    icon: <Warehouse />,
    text: "Items",
  },
  {
    to: "/dash/projects",
    icon: <Construction />,
    text: "Projects",
  },
  {
    to: "/dash/users",
    icon: <PeopleOutline />,
    text: "Users",
  },
];

export const controllerLinks = [
  {
    to: "/dash/transactions",
    icon: <LocalShipping />,
    text: "Transactions",
  },
  {
    to: "/dash/items",
    icon: <Warehouse />,
    text: "Items",
  },
  {
    to: "/dash/category",
    icon: <CategoryOutlined />,
    text: "Categories",
  },
  {
    to: "/dash/brands",
    icon: <BrandingWatermarkOutlined />,
    text: "Brands",
  },
];

export const EngineerLinks = [
  {
    to: "/me/items",
    icon: <Hardware />,
    text: "Items",
  },
  {
    to: "/me/transactions",
    icon: <LocalShipping />,
    text: "Transactions",
  },
  {
    to: "/me/projects",
    icon: <Construction />,
    text: "My Projects",
  },
];
