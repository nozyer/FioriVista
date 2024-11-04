import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
function Home() {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const navigate = useNavigate();

  console.log(user);

  return (
    <div>
      <span>
        {user ? user.email : <button>Please login ot register</button>}
      </span>
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
