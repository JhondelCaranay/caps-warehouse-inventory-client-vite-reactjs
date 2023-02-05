import "./global.scss";
import "react-toastify/dist/ReactToastify.css";

import { ROLES } from "./types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CategoryList from "./pages/dashboard/category/list/CategoryList";
import ProjectList from "./pages/dashboard/project/list/ProjectList";
import BrandList from "./pages/dashboard/brand/list/BrandList";
import EngItems from "./pages/engineer/items/EngItems";
import EngTransactions from "./pages/engineer/transaction/EngTransactions";
import EngProjects from "./pages/engineer/projects/EngProjects";
import ProjectNew from "./pages/dashboard/project/new/ProjectNew";
import CategoryNew from "./pages/dashboard/category/new/CategoryNew";
import BrandNew from "./pages/dashboard/brand/new/BrandNew";
import UserList from "./pages/dashboard/user/list/UserList";
import UserNew from "./pages/dashboard/user/new/UserNew";
import ProjectEdit from "./pages/dashboard/project/edit/ProjectEdit";
import CategoryEdit from "./pages/dashboard/category/edit/CategoryEdit";
import BrandEdit from "./pages/dashboard/brand/edit/BrandEdit";
import {
  DashboardLayout,
  DashHome,
  ItemEdit,
  ItemList,
  ItemNew,
  Login,
  NotFound,
  PublicLayout,
  Single,
  TransactionEdit,
  TransactionList,
  TransactionNew,
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
                {/* <Route index element={<Homepage />} /> */}
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
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
                      <Route path=":transactionId" element={<Single />} />
                      <Route path="edit/:transactionId" element={<TransactionEdit />} />
                      <Route path="new" element={<TransactionNew />} />
                    </Route>

                    <Route path="items">
                      <Route index element={<ItemList />} />
                      <Route path="edit/:itemId" element={<ItemEdit />} />
                      <Route path="new" element={<ItemNew />} />
                    </Route>

                    <Route path="projects">
                      <Route index element={<ProjectList />} />
                      <Route path="edit/:projectId" element={<ProjectEdit />} />
                      <Route path="new" element={<ProjectNew />} />
                    </Route>

                    <Route path="category">
                      <Route index element={<CategoryList />} />
                      <Route path="edit/:categoryId" element={<CategoryEdit />} />
                      <Route path="new" element={<CategoryNew />} />
                    </Route>

                    <Route path="brands">
                      <Route index element={<BrandList />} />
                      <Route path="edit/:brandId" element={<BrandEdit />} />
                      <Route path="new" element={<BrandNew />} />
                    </Route>

                    <Route path="users">
                      <Route index element={<UserList />} />
                      <Route path="new" element={<UserNew />} />
                    </Route>
                  </Route>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
                  <Route path="/me" element={<DashboardLayout />}>
                    <Route index element={<EngItems />} />

                    <Route path="items">
                      <Route index element={<EngItems />} />
                    </Route>

                    <Route path="transactions">
                      <Route index element={<EngTransactions />} />
                    </Route>

                    <Route path="projects">
                      <Route index element={<EngProjects />} />
                    </Route>
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
