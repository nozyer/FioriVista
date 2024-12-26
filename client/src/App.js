import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminManagement from "./pages/admin/AdminManagement";
import CreateProduct from "./pages/admin/CreateProduct";
import AllProducts from "./pages/admin/AllProducts";
import ManageUsers from "./pages/admin/ManageUsers";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/checkout/CheckOut";
import ProductDetail from "./pages/product/ProductDetail";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/protectedRoute";
import AdminRoute from "./routes/adminRoute";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/NavBar";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />

            <Route
              path="/admindashboard/*"
              element={
                <AdminRoute>
                  <Routes>
                    <Route path="" element={<AdminManagement />} />
                    <Route path="create" element={<CreateProduct />} />
                    <Route path="allProducts" element={<AllProducts />} />
                    <Route path="manageUsers" element={<ManageUsers />} />
                  </Routes>
                </AdminRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/product-detail/:productId"
              element={<ProductDetail />}
            />
            <Route path="/checkout" element={<CheckOut />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
