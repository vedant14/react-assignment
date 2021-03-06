import { Switch, Route, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { AuthProvider } from "contexts/AuthContext";

const App = () => {
	return (
		<AuthProvider>
			<Switch>
				<Route
					path="/admin"
					render={(props) => <AdminLayout {...props} />}
				/>
				<Route
					path="/auth"
					render={(props) => <AuthLayout {...props} />}
				/>
				<Redirect from="/" to="/admin/index" />
			</Switch>
		</AuthProvider>
	);
};

export default App;
