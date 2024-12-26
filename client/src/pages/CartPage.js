import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import CartComponent from "../Components/CartComponent";
import logo from "../assets/image.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartPage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white justify-center rounded-r-xl relative mb-10">
      <div className="flex p-4 mx-24 items-center flex-col">
        {cart.items.length > 0 ? (
          <h1 className="text-3xl font-bold mb-5">Your Shopping Cart</h1>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <p className="text-3xl font-medium mb-5">
              Your cart is empty. Start adding products!
            </p>
            <ShoppingCartIcon
              sx={{
                color: "green",
                width: "200px",
                height: "200px",
              }}
            />
          </div>
        )}
        {cart.items.length > 0 && <CartComponent />}
        {cart.items.length === 0 && (
          <button
            className="bg-green-500 text-white font-semibold text-xl w-fit px-2 py-2 rounded-xl hover:bg-green-600"
            onClick={() => navigate("/")}
          >
            Start Shopping
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
