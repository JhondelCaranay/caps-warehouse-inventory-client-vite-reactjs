import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashLayout from "./components/dashboard-layout/DashLayout";
import DashHome from "./pages/dash-home/DashHome";
import Homepage from "./pages/homepage/Homepage";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Homepage />} />
						<Route path="login" element={<Login />} />

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
