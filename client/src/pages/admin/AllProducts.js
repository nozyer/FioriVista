import React, { useContext, useEffect, useState } from "react";
import { getAllProducts } from "../../services/api";
import Loading from "../Loading";
import ProductCart from "../../Components/ProductCart";
import logo from "../../assets/image.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const AllProducts = () => {
  const [products, setProducts] = useState();
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const navigate = useNavigate();
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
    <div className="flex h-screen w-full bg-white justify-center rounded-r-xl relative">
      <div className="flex w-full top-0 absolute justify-between items-center">
        <div className="top-0 left-0 ">
          <button onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className="w-60 h-32" />
          </button>
        </div>
        <div className="top-0 right-0 p-10">{user ? user.email : ""}</div>
      </div>
      <div className="p-40">
        <h6 className="font-bold text-center text-3xl"> All Products</h6>
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
};

export default AllProducts;
