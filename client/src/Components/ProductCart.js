import React from "react";
import product_image from "../assets/cicek.png";
import AddToCartButton from "./AddToCartButton";
import { useNavigate } from "react-router-dom";

const ProductCart = ({ props }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col border-2 rounded-lg bg-orange-200"
      onClick={() =>
        navigate(`/product-detail/${props.productId}`, {
          state: {
            product: props,
          },
        })
      }
    >
      <div>
        <div className="p-2">
          <img src={product_image} alt="image" />
        </div>

        <div className="flex flex-col p-2">
          <span className="font-semibold">Ürün İsmi: {props.productName}</span>
          <span className="font-semibold">
            Ürün Fiyatı: {props.productPrice}
          </span>
          <span className="font-semibold">
            Ürün Stoğu: {props.productStock}
          </span>
        </div>
      </div>
      <div className="flex justify-end p-2">
        <AddToCartButton
          product={{
            productId: props.productId,
            productName: props.productName,
            productPrice: props.productPrice,
            productDescription: props.productDescription,
            productStock: props.productStock,
          }}
          quantity={1}
          disabled={props.productStock <= 0}
        />
      </div>
    </div>
  );
};

export default ProductCart;
