import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashLayout from "./components/layout/dashboard/DashLayout";
import PublicLayout from "./components/layout/public/PublicLayout";
import DashHome from "./pages/dashboard/dash-home/DashHome";
import Homepage from "./pages/public/homepage/Homepage";
import List from "./pages/dashboard/list/List";
import Login from "./pages/public/login/Login";
import New from "./pages/dashboard/new/New";
import Single from "./pages/dashboard/single/Single";
import Register from "./pages/public/register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<ToastContainer />
				<Routes>
					<Route path="/">
						<Route element={<PublicLayout />}>
							<Route index element={<Homepage />} />
							<Route path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
						</Route>

						<Route path="/dash" element={<DashLayout />}>
							<Route index element={<DashHome />} />
							<Route path="home" element={<DashHome />} />

							<Route path="users">
								<Route index element={<List />} />
								<Route path=":userId" element={<Single />} />
								<Route path="new" element={<New />} />
							</Route>

							<Route path="products">
								<Route index element={<List />} />
								<Route path=":productId" element={<Single />} />
								<Route path="new" element={<New />} />
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
