import { Routes, Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import AdminHome from "./containers/AdminHome";
import CreateUser from "./components/CreateUser";
import UserLandingPage from "./containers/UserLandingPage";
import UserHome from "./containers/UserHome";
import PrivateWrapper from "./components/HOC/privateRoute";
import PrivateWrappers from "./components/HOC/privateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/admin"
          element={<PrivateWrappers.PrivateWrapper type="Admin" />}
        >
          <Route path="/admin" element={<AdminHome />} />
        </Route>

        <Route
          path="/admin/add-user"
          element={<PrivateWrappers.PrivateWrapper type="Admin" />}
        >
          <Route path="/admin/add-user" element={<CreateUser />} />
        </Route>
        <Route
          path="/home"
          element={<PrivateWrappers.PrivateWrapper2 type="User" />}
        >
          <Route path="/home" element={<UserHome />} />
        </Route>
        <Route
          path="/user/landing-page"
          element={<PrivateWrappers.PrivateWrapper2 type="User" />}
        >
          <Route path="/user/landing-page" element={<UserLandingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
