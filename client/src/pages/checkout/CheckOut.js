import React from "react";
import { useSelector } from "react-redux";

const CheckOut = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  return <div>CheckOut</div>;
};

export default CheckOut;
