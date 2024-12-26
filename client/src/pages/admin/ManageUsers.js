import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/image.png";
import { AuthContext } from "../../contexts/AuthContext";
import { changeUserRole, deleteUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Loading from "../Loading";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState();
  const authContext = useContext(AuthContext);
  const currentUser = authContext.user;
  const navigate = useNavigate();
  console.log(currentUser?.uid);

  const userTableHeaders = [
    "User Email",
    "User Role",
    "User Id",
    "User Name",
    "Change Role",
    "Actions",
  ];
  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      onSnapshot(usersRef, (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setUsers(users);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (tableUser) => {
    try {
      const response = await deleteUser(tableUser.userUid);
      toast.success("User deleted succesfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = async (tableUser) => {
    if (tableUser.userRole === "admin") {
      const res = await changeUserRole(tableUser.userUid, "user");
      if (res.status === 200) {
        toast.success(res.data);
      } else {
        toast.error(res.error);
      }
    }
    if (tableUser.userRole === "user") {
      const res = await changeUserRole(tableUser.userUid, "admin");
      if (res.status === 200) {
        toast.success(res.data);
      } else {
        toast.error(res.error);
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col h-full bg-white justify-center rounded-r-xl mb-10 relative">
      <div className="flex flex-col  mx-24 gap-10">
        <span className="font-bold text-center text-3xl text-black flex justify-center">
          {" "}
          Manage Users
        </span>
        {users ? (
          <table>
            <thead>
              <tr>
                {userTableHeaders.map((userHeader, userID) => (
                  <th key={userID}>{userHeader}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((tableUser, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 border-b text-center">
                    {tableUser.userEmail}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {tableUser.userRole}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {tableUser.userUid}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {tableUser.username}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {tableUser.userEmail === currentUser.email ? (
                      "-"
                    ) : (
                      <button
                        onClick={() => {
                          handleChange(tableUser);
                        }}
                        className=" border bg-red-500 text-white font-semibold rounded-lg px-3"
                      >
                        {tableUser.userRole === "admin" ? (
                          <span> Change to User</span>
                        ) : (
                          <span>Change to Admin</span>
                        )}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => {
                        handleDeleteUser(tableUser);
                      }}
                      className="  border bg-red-500 text-white font-semibold rounded-lg px-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
