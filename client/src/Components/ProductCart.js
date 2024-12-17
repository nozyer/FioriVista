import React from "react";

const ProductCart = ({ props }) => {
  return (
    <div className="flex flex-row w-[340px] h-[170px]">
      <div className="flex w-2/5 bg-red-400"></div>
      <div className="flex flex-col w-3/5 bg-blue-400">
        <span>{props.productName}</span>
        <span>{props.productPrice}</span>
        <span>{props.productStock}</span>
        <span>{props.productDescription}</span>
      </div>
    </div>
  );
};

export default ProductCart;
