import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/AuthContext";
import { checkIfUserAdmin } from "../services/api";
import logo from "../assets/image.png";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Button, Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [isInclude, setIsInclude] = useState();
  const authContext = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const user = authContext.user;
  const userProfile = authContext.userProfile;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const cart = useSelector((state) => state.cart);

  const checkUserRole = async () => {
    if (user) {
      const response = await checkIfUserAdmin(user.uid);
      setRole(response.role);
    }
  };
  const checkPathNameIncludesAdmin = () => {
    if (pathname === "/admindashboard") {
      setIsInclude(false);
    } else if (pathname.includes("/admindashboard")) {
      setIsInclude(true);
    } else {
      setIsInclude(false);
    }
  };
  useEffect(() => {
    checkPathNameIncludesAdmin();
  }, [pathname]);
  useEffect(() => {
    checkUserRole();
  }, []);
  const handleButtonNavigate = () => {
    if (isInclude) {
      navigate("/admindashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <nav className="flex items-center justify-between h-[150px] mx-10">
      <button onClick={() => handleButtonNavigate()}>
        <img className="w-60 h-32" src={logo} alt="logo_image"></img>
      </button>
      {pathname === "/" ? (
        <div className="flex items-center relative">
          <input
            className="w-[400px] bg-gray-300 px-5 rounded-xl py-2"
            placeholder="Enter your word to find the flower..."
            value={searchKeyWord}
            onChange={(e) => setSearchKeyWord(e.target.value)}
          ></input>
          <SearchIcon className="absolute right-0 mr-3" />
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold text-black">{user.email}</span>
            <Button
              onClick={(event) => setAnchorEl(event.currentTarget)}
              startIcon={<PersonIcon />}
              sx={{
                color: "black",
                textTransform: "none",
              }}
            >
              My Account
            </Button>
            <>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/profile");
                  }}
                >
                  My Profile
                </MenuItem>
                {userProfile ? (
                  <div>
                    {userProfile.userRole === "admin" ? (
                      <MenuItem
                        onClick={() => {
                          setAnchorEl(null);
                          navigate("/admindashboard");
                        }}
                      >
                        Admin Page
                      </MenuItem>
                    ) : null}
                  </div>
                ) : (
                  ""
                )}
              </Menu>
            </>
            <Button
              onClick={() => {
                authContext?.logout();
                navigate("/login");
              }}
              sx={{
                color: "black",
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <button
              className="text-black"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="text-black"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </>
        )}
        <button
          className="w-fit p-2 bg-green-500 hover:bg-green-600 rounded-md relative"
          onClick={() => navigate("/cart")}
        >
          <Badge
            badgeContent={cart.totalItems}
            color="error"
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
            }}
          ></Badge>
          <ShoppingCartIcon
            sx={{
              color: "white",
              cursor: "pointer",
              fontSize: 28,
            }}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
