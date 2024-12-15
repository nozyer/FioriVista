import React, { useContext, useState } from "react";
import logo from "../../assets/image.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import uuid4 from "uuid4";
import { addProduct } from "../../services/api";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  console.log(user);

  const handleAddProduct = async () => {
    console.log("asdasdasd");
    const productId = uuid4();
    const product = {
      productId,
      productName,
      productPrice,
      productStock,
      productDescription,
    };
    console.log(product);
    try {
      await addProduct(product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen flex-col w-full justify-center items-center px-8 py-12 bg-white rounded-r-xl relative">
      <div className="flex w-full top-0 justify-between items-center absolute">
        <div className="top-0 left-0">
          <button onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className="w-60 h-32" />
          </button>
        </div>
        <div className="top-0 right-0 p-10">{user ? user.email : ""}</div>
      </div>
      <form
        onSubmit={handleAddProduct}
        className="flex h-2/5 flex-col w-2/5 gap-6 text-xl items-center border-2"
      >
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
        <input
          type="productPrice"
          id="productPrice"
          value={productPrice}
          placeholder="Product Price"
          onChange={(e) => setProductPrice(e.target.value)}
          className="w-full pl-2  rounded-full border-2 border-gray-500  text-black"
          required
        />
        <input
          type="productDescription"
          id="productDescription"
          value={productDescription}
          placeholder="Product Description"
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full pl-2  rounded-full border-2 border-gray-500  text-black"
          required
        />
        <button className="bg-blue-600 rounded-full text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
