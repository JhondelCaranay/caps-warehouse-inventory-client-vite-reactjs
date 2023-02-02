import {
  BrandingWatermarkOutlined,
  CategoryOutlined,
  Construction,
  Dashboard,
  Hardware,
  LocalShipping,
  Warehouse,
} from "@mui/icons-material";
import { ROLES } from "../../types";

export const ADMIN_CONTROLLER_ONLY = [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.WAREHOUSE_CONTROLLER];
export const ADMINS_ONLY = [ROLES.ADMIN, ROLES.SUPER_ADMIN];
export const SUPER_ADMIN_ONLY = [ROLES.SUPER_ADMIN];
export const ENGINEER_ONLY = [ROLES.ENGINEER];

export const MainLinks = {
  to: "/dash",
  icon: <Dashboard />,
  text: "Dashboard",
};

export const ListLinks = [
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

export const EngineeLinks = [
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
