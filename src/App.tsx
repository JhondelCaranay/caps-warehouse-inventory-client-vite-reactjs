import "./global.scss";
import "react-toastify/dist/ReactToastify.css";

import { ROLES } from "./types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  BrandDetail,
  BrandEdit,
  BrandList,
  BrandNew,
  CategoryDetail,
  CategoryEdit,
  CategoryList,
  CategoryNew,
  DashboardLayout,
  DashHome,
  EngItemDetail,
  EngItems,
  EngProjectDetail,
  EngProjects,
  EngTransactionDetail,
  EngTransactions,
  ForgotPassword,
  Homepage,
  ItemDetail,
  ItemEdit,
  ItemList,
  ItemNew,
  Login,
  NotFound,
  ProjectDetail,
  ProjectEdit,
  ProjectList,
  ProjectNew,
  PublicLayout,
  ResetCode,
  Single,
  TransactionDetail,
  TransactionEdit,
  TransactionList,
  TransactionNew,
  UserDetail,
  UserList,
  UserNew,
  UserProfile,
} from "./pages";

import { AuthNotAllowed, Prefetch, RequireAuth } from "./guards";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/">
            <Route element={<AuthNotAllowed />}>
              <Route element={<PublicLayout />}>
                <Route index element={<Homepage />} />
                {/* <Route index element={<Login />} /> */}
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-code" element={<ResetCode />} />
                {/* <Route path="register" element={<Register />} /> */}
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route path="/dash" element={<DashboardLayout />}>
                  <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]} />}>
                    <Route index element={<DashHome />} />
                    <Route path="home" element={<DashHome />} />
                  </Route>

                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.WAREHOUSE_CONTROLLER]}
                      />
                    }
                  >
                    <Route path="transactions">
                      <Route index element={<TransactionList />} />
                      <Route path=":transactionId" element={<TransactionDetail />} />
                      <Route path="edit/:transactionId" element={<TransactionEdit />} />
                      <Route path="new" element={<TransactionNew />} />
                    </Route>

                    <Route path="items">
                      <Route index element={<ItemList />} />
                      <Route path=":itemId" element={<ItemDetail />} />
                      <Route path="edit/:itemId" element={<ItemEdit />} />
                      <Route path="new" element={<ItemNew />} />
                    </Route>

                    <Route path="projects">
                      <Route index element={<ProjectList />} />
                      <Route path=":projectId" element={<ProjectDetail />} />
                      <Route path="edit/:projectId" element={<ProjectEdit />} />
                      <Route path="new" element={<ProjectNew />} />
                    </Route>

                    <Route path="category">
                      <Route index element={<CategoryList />} />
                      <Route path=":categoryId" element={<CategoryDetail />} />
                      <Route path="edit/:categoryId" element={<CategoryEdit />} />
                      <Route path="new" element={<CategoryNew />} />
                    </Route>

                    <Route path="brands">
                      <Route index element={<BrandList />} />
                      <Route path=":brandId" element={<BrandDetail />} />
                      <Route path="edit/:brandId" element={<BrandEdit />} />
                      <Route path="new" element={<BrandNew />} />
                    </Route>

                    <Route path="users">
                      <Route index element={<UserList />} />
                      <Route path=":userId" element={<UserDetail />} />
                      <Route path="new" element={<UserNew />} />
                    </Route>
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="single" element={<Single />} />
                  </Route>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
                  <Route path="/me" element={<DashboardLayout />}>
                    <Route index element={<EngItems />} />

                    <Route path="items">
                      <Route index element={<EngItems />} />
                      <Route path=":itemId" element={<EngItemDetail />} />
                    </Route>

                    <Route path="transactions">
                      <Route index element={<EngTransactions />} />
                      <Route path=":transactionId" element={<EngTransactionDetail />} />
                    </Route>

                    <Route path="projects">
                      <Route index element={<EngProjects />} />
                      <Route path=":projectId" element={<EngProjectDetail />} />
                    </Route>
                    <Route path="profile" element={<UserProfile />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
