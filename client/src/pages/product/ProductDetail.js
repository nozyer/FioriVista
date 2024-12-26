import React from "react";
import { useLocation } from "react-router-dom";
import productImage from "../../assets/cicek.png";
import AddToCartButton from "../../Components/AddToCartButton";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="flex relative justify-center items-center bg-white">
      <div className="flex flex-row border w-full mx-48">
        <div className="flex w-1/3">
          <img
            src={productImage}
            alt={product.productName}
            className="h-96 object-cover"
          />
        </div>
        <div className="flex border rounded-xl w-2/3 flex-col">
          <h1 className="text-3xl font-bold mb-20">{product.productName}</h1>
          <p className="mb-2 font-semibold text-xl">Price: ${product.productPrice}</p>
          <p className="mb-2 font-semibold text-xl">Stock: {product.productStock}</p>
          <p className="mb-2 font-semibold text-xl">Description: {product.productDescription}</p>

          <div className="flex justify-end px-4 gap-2">
            <AddToCartButton
              product={{
                productId: product.productId,
                productName: product.productName,
                productPrice: product.productPrice,
                productDescription: product.productDescription,
                productStock: product.productStock,
              }}
              quantity={1}
              disabled={product.productStock <= 0}
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductDetail;
