import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { checkIfUserAdmin } from "../services/api";
import logo from "../assets/image.png";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const user = authContext.user;
  const navigate = useNavigate();
  const checkUserRole = async () => {
    if (user) {
      const response = await checkIfUserAdmin(user.uid);
      setRole(response.role);
    }
  };
  useEffect(() => {
    checkUserRole();
  }, []);

  return (
    <nav className="flex items-center justify-between h-[150px]">
      <img className="w-60 h-32" src={logo} alt="logo_image"></img>
      <div className="flex items-center relative">
        <input
          className="w-[400px] bg-gray-300 px-5 rounded-xl py-2"
          placeholder="Enter your word to find the flower..."
        ></input>
        <SearchIcon className="absolute right-0 mr-3" />
      </div>
      <div className="flex w-fit">
        {user ? (
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold text-black">{user.email}</span>
            {role === "admin" ? (
              <button
                onClick={() => navigate("/admindashboard")}
                className="text-black"
              >
                Admin Page
              </button>
            ) : (
              ""
            )}
            <PersonIcon
              sx={{
                color: "black",
              }}
            />
            <button
              className=" text-black"
              onClick={() => {
                authContext?.logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              className=" text-black"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="  text-black"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
