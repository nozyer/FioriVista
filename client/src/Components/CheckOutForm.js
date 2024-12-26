import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { clearCart } from "../redux/cartSlice";
import { orderAPI } from "../services/api";
import uuid4 from "uuid4";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import RotateRightSharpIcon from "@mui/icons-material/RotateRightSharp";

const CheckoutForm = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.userProfile;
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    const orderId = uuid4();
    if (!stripe || !elements) return;
    setPaymentLoading(true);
    console.log(typeof amount);

    try {
      // Create payment intent on backend
      const { data } = await axios.post(
        "http://localhost:8000/api/payment/create-payment-intent",
        {
          amount: cart.totalAmount, // In cents
        }
      );

      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.userEmail, // Add actual customer details
            },
          },
        });

        if (result.error) {
          setError(result.error.message || "Payment failed");
        } else if (result.paymentIntent?.status === "succeeded") {
          const orderData = {
            userId: user.userUid,
            orderId,
            cartItems: cart.items,
            totalAmount: cart.totalAmount,
            status: "pending",
            createdAt: new Date().toISOString()
          };
          const response = await orderAPI.createOrder(orderData);
          toast.success("başarıyla eklendi");
          setPaymentSuccess(true);
          handleClearCart();
          navigate("/payment-successfull");
          setError(null);
        }
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
    }

    setPaymentLoading(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="border-2 border-gray-400 p-5">
        <h1 className="text-xl font-bold">Order Address</h1>
      </div>
      <div className="grid grid-col-1 gap-2 w-full">
        <h1 className="text-xl font-semibold"> Products to be delivered:</h1>
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="border-2 border-gray-400 p-5 w-fit rounded-lg"
          >
            <h1 className="text-xl font-bold">{item.name}</h1>
            <p>Price: ${item.productPrice}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: ${item.productPrice * item.quantity}</p>
          </div>
        ))}
      </div>
      <div className="border-2 p-5 flex flex-col">
        <CardElement />
        {error && <p className="text-red-500">{error}</p>}
        {paymentSuccess && (
          <p className="text-green-500">Payment Successful!</p>
        )}
        <button
          onClick={handleCheckout}
          disabled={!stripe || paymentLoading}
          className="mt-4 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition w-fit self-end"
        >
          {paymentLoading ? (
            <RotateRightSharpIcon
              sx={{
                animation: "spin 4s linear infinite",
              }}
            />
          ) : (
            "Checkout"
          )}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
