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
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<ToastContainer />
				<Routes>
					<Route path="/">
						<Route element={<AuthNotAllowed />}>
							<Route element={<PublicLayout />}>
								<Route index element={<Homepage />} />
								<Route path="login" element={<Login />} />
								<Route path="register" element={<Register />} />
							</Route>
						</Route>

						<Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
							<Route element={<Prefetch />}>
								<Route path="/dash" element={<DashLayout />}>
									<Route index element={<DashHome />} />
									<Route path="home" element={<DashHome />} />

									<Route path="transactions">
										<Route index element={<TransactionList />} />
										<Route path=":transactionId" element={<Single />} />
										<Route path="new" element={<TransactionNew />} />
									</Route>

									<Route path="items">
										<Route index element={<ItemList />} />
										<Route path=":itemId" element={<Single />} />
										<Route path="new" element={<TransactionNew />} />
									</Route>

									<Route path="category">
										<Route index element={<CategoryList />} />
										<Route path=":categoryId" element={<Single />} />
										<Route path="new" element={<TransactionNew />} />
									</Route>

									<Route path="projects">
										<Route index element={<ProjectList />} />
										<Route path=":projectsId" element={<Single />} />
										<Route path="new" element={<TransactionNew />} />
									</Route>

									{/* <Route path="users">
										<Route index element={<List />} />
										<Route path=":userId" element={<Single />} />
										<Route path="new" element={<New />} />
									</Route> */}

									{/* <Route path="products">
										<Route index element={<List />} />
										<Route path=":productId" element={<Single />} />
										<Route path="new" element={<New />} />
									</Route> */}
								</Route>
							</Route>
						</Route>

						<Route path="*" element={<div>404</div>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
