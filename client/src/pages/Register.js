import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/image.png";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (authContext) {
        await authContext.register(email, password);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen relative">
      <div className="mb-12 absolute">
        <button onClick={() => navigate("/")}>                
          <img
            src={Logo}
            alt="Logo"
            className="w-60 h-32"
          />
        </button>
      </div>
      <div className="flex flex-col w-full justify-center items-center px-8 py-12 bg-white rounded-r-xl">
        <h2 className="text-3xl font-semibold mb-8 text-black">Register</h2>
        <form onSubmit={handleRegister} className="w-3/4 max-w-md flex flex-col">
          <div className="mb-2 relative">
            <EmailIcon className="absolute top-3 left-3 text-black " />
            <input
              type="email"
              id="email"
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 pl-10 rounded-full border-2 border-gray-500  text-black  focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6 relative">
            <LockIcon className="absolute top-3 left-3 text-black " />
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pl-10 rounded-full border-2 border-gray-500  text-black  focus:outline-none focus:border-blue-500"

              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              onClick={(event) => handleRegister(event)}
              disabled={loading}
              className="w-fit bg-green-500 hover:bg-blue-700 text-white font-regular py-1 px-6 rounded-xl transition-all duration-300"
            >
              {loading ? "Signing Up..." : "Create Account"}
            </button>
          </div>

        </form>
        <div className=" text-center text-sm">
          <button
            onClick={() => navigate("/login")}
            className="mt-2 text-blue-500 hover:text-blue-400 font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    </div >
  );
};


export default Register;
