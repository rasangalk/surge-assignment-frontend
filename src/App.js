import { Routes, Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import AdminHome from "./containers/AdminHome";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/add-user" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
