import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { checkIfUserAdmin } from "../services/api";

function Home() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [role, setRole] = useState(null);
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
    <div>
      <span>
        {user ? user.email : <button>Please login or register</button>}
      </span>
      {role === "admin" ? (
        <button onClick={() => navigate("/admindashboard")}>
          Admin Dashboard
        </button>
      ) : (
        <></>
      )}
      {!user ? (
        <>
          <button
            className="w-full p-4 bg-red-500 text-white"
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Login
          </button>
          <button
            className=" w-full p-4 bg-red-500 text-white"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </>
      ) : (
        <span></span>
      )}
      {user ? (
        <button
          className="w-full p-4 bg-red-500 text-white"
          onClick={() => {
            authContext?.logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Home;
