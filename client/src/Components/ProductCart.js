import React from "react";
import product_image from "../assets/cicek.png";

const ProductCart = ({ props }) => {
  return (
    <div className="flex flex-col border-2 rounded-lg  bg-orange-200">
      <div className="p-2">
        <img src={product_image} alt="image" />
      </div>

      <div className="flex flex-col p-2">
        <span className="font-semibold ">Ürün İsmi: {props.productName}</span>
        <span className="font-semibold ">
          Ürün Fiyatı: {props.productPrice}
        </span>
        <span className="font-semibold ">Ürün Stoğu: {props.productStock}</span>
      </div>
    </div>
  );
};

export default ProductCart;
