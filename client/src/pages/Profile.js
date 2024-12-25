import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { fetchUserData } from "../services/api";
import { toast } from "react-toastify";
import Loading from "./Loading";
import UpdateProfile from "../Components/UpdateProfile";
import logo from "../assets/image.png";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const userProfile = authContext.userProfile;

 
  return (
    <>{userProfile ? <UpdateProfile {...userProfile} /> : <Loading />}</>
  );
};
export default Profile;
