import React, { useContext, useEffect, useState } from "react";
import ProductCart from "../Components/ProductCart";
import Loading from "./Loading";
import { checkIfUserAdmin, getAllProducts } from "../services/api";
import NavBar from "../Components/NavBar";

function Home() {
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
  return (
    <div className="h-full mx-24 pb-10">
      <NavBar />
      <div>
        {products ? (
          <div className="grid grid-cols-2 gap-10 mt-8 lg:grid-cols-4">
            {products.map((product, key) => (
              <div key={key}>
                <ProductCart props={product} />
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default Home;
