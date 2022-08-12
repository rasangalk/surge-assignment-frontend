import { Routes, Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import AdminHome from "./containers/AdminHome";
import CreateUser from "./components/CreateUser";
import UserLandingPage from "./containers/UserLandingPage";
import UserHome from "./containers/UserHome";
import PrivateWrapper from "./components/HOC/privateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/admin" element={<PrivateWrapper />}>
          <Route path="/admin" element={<AdminHome />} />
        </Route>

        <Route path="/admin/add-user" element={<PrivateWrapper />}>
          <Route path="/admin/add-user" element={<CreateUser />} />
        </Route>
        <Route path="/home" element={<PrivateWrapper />}>
          <Route path="/home" element={<UserHome />} />
        </Route>
        <Route path="/user/landing-page" element={<PrivateWrapper />}>
          <Route path="/user/landing-page" element={<UserLandingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
