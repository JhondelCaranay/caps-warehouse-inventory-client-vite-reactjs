import { v4 } from "uuid";
export { default as PublicLayout } from "./layout/public/PublicLayout";
export { default as NotFound } from "./public/404/Page404";
export { default as Homepage } from "./public/homepage/Homepage";
export { default as Login } from "./public/login/Login";

// dashboard
export { default as DashboardLayout } from "./layout/dashboard/DashboardLayout";
export { default as DashHome } from "./dashboard/dash-home/DashHome";

export { default as TransactionList } from "./dashboard/transactions/list/TransactionList";
export { default as TransactionNew } from "./dashboard/transactions/new/TransactionNew";
export { default as TransactionEdit } from "./dashboard/transactions/edit/TransactionEdit";
export { default as TransactionDetail } from "./dashboard/transactions/detail/TransactionDetail";

export { default as ItemList } from "./dashboard/items/list/ItemList";
export { default as ItemNew } from "./dashboard/items/new/ItemNew";
export { default as ItemEdit } from "./dashboard/items/edit/ItemEdit";
export { default as ItemDetail } from "./dashboard/items/detail/ItemDetail";

export { default as ProjectList } from "./dashboard/project/list/ProjectList";
export { default as ProjectNew } from "./dashboard/project/new/ProjectNew";
export { default as ProjectEdit } from "./dashboard/project/edit/ProjectEdit";
export { default as ProjectDetail } from "./dashboard/project/detail/ProjectDetail";

export { default as CategoryList } from "./dashboard/category/list/CategoryList";
export { default as CategoryNew } from "./dashboard/category/new/CategoryNew";
export { default as CategoryEdit } from "./dashboard/category/edit/CategoryEdit";
export { default as CategoryDetail } from "./dashboard/category/detail/CategoryDetail";

export { default as BrandList } from "./dashboard/brand/list/BrandList";
export { default as BrandNew } from "./dashboard/brand/new/BrandNew";
export { default as BrandEdit } from "./dashboard/brand/edit/BrandEdit";
export { default as BrandDetail } from "./dashboard/brand/detail/BrandDetail";

export { default as UserList } from "./dashboard/user/list/UserList";
export { default as UserNew } from "./dashboard/user/new/UserNew";
export { default as UserDetail } from "./dashboard/user/detail/UserDetail";

export { default as EngTransactions } from "./engineer/transaction/list/EngTransactions";
export { default as EngTransactionDetail } from "./engineer/transaction/detail/EngTransactionDetail";
export { default as EngProjects } from "./engineer/projects/list/EngProjects";
export { default as EngProjectDetail } from "./engineer/projects/detail/EngProjectDetail";
export { default as EngItems } from "./engineer/items/list/EngItems";
export { default as EngItemDetail } from "./engineer/items/detail/EngItemDetail";

export { default as UserProfile } from "./profile/UserProfile";

export { default as Single } from "./dashboard/single/Single";
