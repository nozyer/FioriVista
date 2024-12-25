import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useContext } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminManagement from "./pages/admin/AdminManagement";
import CreateProduct from "./pages/admin/CreateProduct";
import AllProducts from "./pages/admin/AllProducts";
import ManageUsers from "./pages/admin/ManageUsers";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/admindashboard" element={<AdminManagement />} />
            <Route path="/admindashboard/create" element={<CreateProduct />} />
            <Route
              path="/admindashboard/allProducts"
              element={<AllProducts />}
            />
            <Route
              path="/admindashboard/manageUsers"
              element={<ManageUsers />}
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
