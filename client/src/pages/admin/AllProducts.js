import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/api";
import Loading from "../Loading";

const AllProducts = () => {
  const [products, setProducts] = useState();
  const fetchProducts = async () => {
    try {
      const productList = await getAllProducts();
      setProducts(productList);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div>
      {products ? (
        <div>
          {products.map((product, key) => (
            <div key={key}>
              <p>{product.productName}</p>
              <p>{product.productPrice}</p>
              <p>{product.productStock}</p>
              <p>{product.productDescription}</p>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AllProducts;
