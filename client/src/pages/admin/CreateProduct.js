import React, { useContext, useState } from "react";
import logo from "../../assets/image.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  
  return (
    <div className="flex h-screen flex-col w-full justify-center items-center px-8 py-12 bg-white rounded-r-xl relative">
      <div className="flex w-full top-0 justify-between items-center absolute">
        <div className="top-0 left-0">
          <button onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className="w-60 h-32" />
          </button>
        </div>
        <div className="top-0 right-0 p-10">{user.email}</div>
      </div>
      <form className="flex h-2/5 flex-col w-2/5 gap-6 text-xl items-center border-2">
        <input
          type="productName"
          id="productName"
          value={productName}
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
          className="w-full pl-2  rounded-full border-2 border-gray-500  text-black"
          required
        />
        <input
          type="productStock"
          id="productStock"
          value={productStock}
          placeholder="Product Stock"
          onChange={(e) => setProductStock(e.target.value)}
          className="w-full pl-2  rounded-full border-2 border-gray-500  text-black"
          required
        />
      </form>
    </div>
  );
};

export default CreateProduct;
