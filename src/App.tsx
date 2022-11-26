import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashLayout from "./components/layout/dash-layout/DashLayout";
import PublicLayout from "./components/layout/public-layout/PublicLayout";
import DashHome from "./pages/dashboard/dash-home/DashHome";
import Homepage from "./pages/public/homepage/Homepage";
import List from "./pages/dashboard/list/List";
import Login from "./pages/public/login/Login";
import New from "./pages/dashboard/new/New";
import Single from "./pages/dashboard/single/Single";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route element={<PublicLayout />}>
							<Route index element={<Homepage />} />
							<Route path="login" element={<Login />} />
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
