import { Routes, Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import AdminHome from "./containers/AdminHome";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </div>
  );
}

export default App;
