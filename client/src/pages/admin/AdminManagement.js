import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/image.png";

const AdminManagement = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full justify-center items-center px-8 bg-white rounded-r-xl relative">
      <span className="flex mb-6 text-4xl font-semibold">Welcome Admin</span>
      <div className="flex h-2/5 flex-col w-1/3 gap-6 text-xl justify-center items-center mt-10">
        <button
          className="flex w-full px-3 bg-green-200 hover:bg-green-400 rounded-2xl  transition all"
          onClick={() => navigate("/admindashboard/create")}
        >
          Create Product
        </button>
        <button
          className="flex w-full px-3 bg-green-200 hover:bg-green-400 rounded-2xl  transition all"
          onClick={() => navigate("/admindashboard/allProducts")}
        >
          All Product
        </button>
        <button
          className="flex w-full px-3 bg-green-200 hover:bg-green-400 rounded-2xl  transition all"
          onClick={() => navigate("/admindashboard/manageUsers")}
        >
          Manage Users
        </button>
      </div>
    </div>
  );
};

export default AdminManagement;
