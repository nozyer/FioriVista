import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminManagement from "./pages/admin/AdminManagement";
import CreateProduct from "./pages/admin/CreateProduct";
import AllProducts from "./pages/admin/AllProducts";
import ManageUsers from "./pages/admin/ManageUsers";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/admindashboard" element={<AdminManagement />} />
        <Route path="/admindashboard/create" element={<CreateProduct />} />
        <Route path="/admindashboard/allProducts" element={<AllProducts />} />
        <Route path="/admindashboard/manageUsers" element={<ManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
