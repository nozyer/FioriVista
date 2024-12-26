import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeOneItemFromCart,
  clearCart,
  addToCart,
} from "../redux/cartSlice";
import { AuthContext } from "../contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

const CartComponent = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (item) => {
    dispatch(removeOneItemFromCart(item.productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleAddToCart = (item) => {
    const quantity = 1;
    const product = {
      productId: item.productId,
      productName: item.productName,
      productPrice: item.productPrice,
      productDescription: item.productDescription,
      productStock: item.productStock,
    };
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );
  };

  const handleCheckout = () => {
    if (user == null) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="relative flex flex-row container gap-10 items-center">
      <div className="w-3/4">
        {cart.items.length === 0 ? (
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.productId}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold">{item.productName}</p>
                    <p>Price: ${item.productPrice}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p className="font-bold">
                      Total Price: ${item.productPrice * item.quantity}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center p-2 border-2 border-gray-600 rounded-3xl">
                    <button
                      onClick={() => handleRemove(item)}
                      aria-label={`Decrease quantity of ${item.productName}`}
                    >
                      {item.quantity > 1 ? (
                        <RemoveSharpIcon sx={{ color: "black" }} />
                      ) : (
                        <DeleteIcon sx={{ color: "black" }} />
                      )}
                    </button>
                    <span className="font-semibold text-black text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      aria-label={`Increase quantity of ${item.productName}`}
                    >
                      <AddSharpIcon sx={{ color: "black" }} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="flex flex-col w-1/4 gap-2">
        <button
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition w-full"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
        <div className="flex flex-col border-2 rounded-xl p-3">
          <span className="text-center font-semibold text-xl text-red-500 mt-4">
            Purchase Summary
          </span>
          <div className="flex flex-col mt-4 gap-2">
            <div className="flex flex-row bg-gray-300 rounded-xl justify-between">
              <p className="flex text-lg font-semibold  py-2  pl-2">
                Total: {cart.totalItems} Items
              </p>
              <p className="flex  text-lg font-semibold  py-2 pr-2">
                {cart.totalAmount}$
              </p>
            </div>
          </div>
          <button
            onClick={handleClearCart}
            className="mt-4 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 transition"
            aria-label="Clear all items from cart"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
