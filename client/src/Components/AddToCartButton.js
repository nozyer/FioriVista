import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

const AddToCartButton = ({ product, quantity, disabled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartNotification = () => {
    return toast.success(
      <div className="flex flex-col">
        <span>
          <strong>Product added to cart.</strong>
        </span>
        <button
          className="text-left text-green-500 underline"
          onClick={() => navigate("/cart")}
        >
          Go to cart
        </button>
      </div>
    );
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    dispatch(
      addToCart({
        productId: product.productId,
        productName: product.productName,
        productPrice: product.productPrice,
        productDescription: product.productDescription,
        quantity: quantity,
      })
    );

    cartNotification();
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ${
        disabled && "opacity-50 cursor-not-allowed"
      }`}
      aria-label={`Add ${product.productName} to cart`}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
