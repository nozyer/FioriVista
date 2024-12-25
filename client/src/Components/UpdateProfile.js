import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { fetchUserData, updateUserDetails } from "../services/api";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import logo from "../assets/image.png";

const UpdateProfile = ({ username, userEmail, userAddress, userUid }) => {
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState(username || "");
  const [userEmailState, setUserEmail] = useState(userEmail || "");
  const [userAddressState, setUserAddress] = useState(userAddress || "");
  const navigate = useNavigate();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserDetails(
        userUid,
        userEmailState,
        userName,
        userAddressState
      );
      console.log(response.message);
    } catch (error) {
      toast.error("Update failed");
    }
  };
  useEffect(() => {
    const userRef = doc(db, "users", userUid);

    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setUserData(docSnapshot.data());
        setUserName(docSnapshot.data().username);
        setUserEmail(docSnapshot.data().userEmail);
        setUserAddress(docSnapshot.data().userAddress);
        toast.success("Succesfully changed")
        
      } else {
        console.log("User document not found!");
      }
    });

    return () => unsubscribe();
  }, [userUid]);

  return (
    <div className="flex h-full flex-col w-full justify-center items-center bg-white rounded-r-xl relative">
      <div className="flex w-full top-0 justify-between items-center absolute">
        <button onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="w-60 h-32" />
        </button>
        <div className="top-0 right-0 p-10">
          {userUid ? userEmailState : ""}
        </div>
      </div>
      <div className="flex flex-col pt-24 gap-10">
        <span className="font-bold text-center text-3xl text-black flex justify-center mt-16">
          Update Profile
        </span>
        <form
          onSubmit={handleUpdateUser}
          className="flex flex-col gap-6 text-xl items-center mt-36 w-[400px]"
        >
          <input
            className=" border-2 rounded-2xl pl-2 border-black w-full"
            type="text"
            id="username"
            value={userName}
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            className=" border-2 rounded-2xl pl-2 border-black w-full"
            type="email"
            id="userEmail"
            value={userEmailState}
            placeholder="User Email"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <input
            className=" border-2 rounded-2xl pl-2 border-black w-full"
            type="text"
            id="userAddress"
            value={userAddressState}
            placeholder="User Address"
            onChange={(e) => setUserAddress(e.target.value)}
            required
          />
          <button
            className="bg-blue-600 rounded-full text-white p-2 mt-6"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateProfile;
