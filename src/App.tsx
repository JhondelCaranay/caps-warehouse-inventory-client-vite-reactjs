import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashHome from "./pages/dashboard/dash-home/DashHome";
import Homepage from "./pages/public/homepage/Homepage";
import Login from "./pages/public/login/Login";
import Single from "./pages/dashboard/single/Single";
import Register from "./pages/public/register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionList from "./pages/dashboard/transactions/list/TransactionList";
import TransactionNew from "./pages/dashboard/transactions/new/TransactionNew";
import ItemList from "./pages/dashboard/items/list/ItemList";
import PublicLayout from "./pages/layout/public/PublicLayout";
import DashLayout from "./pages/layout/dashboard/DashLayout";
import Prefetch from "./guards/Prefetch";
import RequireAuth from "./guards/RequireAuth";
import AuthNotAllowed from "./guards/AuthNotAllowed";
import { ROLES } from "./types";
import CategoryList from "./pages/dashboard/category/list/CategoryList";
import ProjectList from "./pages/dashboard/project/list/ProjectList";
import "./global.scss";
import BrandList from "./pages/dashboard/brand/list/BrandList";
import EngItems from "./pages/engineer/items/EngItems";
import EngTransactions from "./pages/engineer/transaction/EngTransactions";
import EngProjects from "./pages/engineer/projects/EngProjects";
import ItemNew from "./pages/dashboard/items/new/ItemNew";
import ProjectNew from "./pages/dashboard/project/new/ProjectNew";
import CategoryNew from "./pages/dashboard/category/new/CategoryNew";
import BrandNew from "./pages/dashboard/brand/new/BrandNew";
import UserList from "./pages/dashboard/user/list/UserList";
import UserNew from "./pages/dashboard/user/new/UserNew";
import ProjectEdit from "./pages/dashboard/project/edit/ProjectEdit";
import Page404 from "./pages/public/404/Page404";
import CategoryEdit from "./pages/dashboard/category/edit/CategoryEdit";
import BrandEdit from "./pages/dashboard/brand/edit/BrandEdit";
import ItemEdit from "./pages/dashboard/items/edit/ItemEdit";
import TransactionEdit from "./pages/dashboard/transactions/edit/TransactionEdit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/">
            <Route element={<AuthNotAllowed />}>
              <Route element={<PublicLayout />}>
                {/* <Route index element={<Homepage />} /> */}
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route path="/dash" element={<DashLayout />}>
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
                      {/* <Route path=":itemId" element={<Single />} /> */}
                      <Route path="edit/:itemId" element={<ItemEdit />} />
                      <Route path="new" element={<ItemNew />} />
                    </Route>

                    <Route path="projects">
                      <Route index element={<ProjectList />} />
                      {/* <Route path=":projectsId" element={<Single />} /> */}
                      <Route path="edit/:projectId" element={<ProjectEdit />} />
                      <Route path="new" element={<ProjectNew />} />
                    </Route>

                    <Route path="category">
                      <Route index element={<CategoryList />} />
                      {/* <Route path=":categoryId" element={<Single />} /> */}
                      <Route path="edit/:categoryId" element={<CategoryEdit />} />
                      <Route path="new" element={<CategoryNew />} />
                    </Route>

                    <Route path="brands">
                      <Route index element={<BrandList />} />
                      {/* <Route path=":userId" element={<Single />} /> */}
                      <Route path="edit/:brandId" element={<BrandEdit />} />
                      <Route path="new" element={<BrandNew />} />
                    </Route>

                    <Route path="users">
                      <Route index element={<UserList />} />
                      {/* <Route path=":userId" element={<Single />} /> */}
                      <Route path="new" element={<UserNew />} />
                    </Route>
                  </Route>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
                  <Route path="/me" element={<DashLayout />}>
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
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
