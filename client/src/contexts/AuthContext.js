import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const db = getFirestore();

  const fetchUserProfile = async (userUid) => {
    const userDoc = await getDoc(doc(db, "users", userUid));
    if (userDoc.exists()) {
      const profileData = userDoc.data();

      setUserProfile(profileData);
      localStorage.setItem("userProfile", JSON.stringify(profileData));
    } else {
      setUserProfile(null);
      localStorage.removeItem("userProfile");
    }
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await fetchUserProfile(user.uid);
      } else {
        setUser(null);
        setUserProfile(null);
        localStorage.removeItem("userProfile");
      }
    });
    return () => unsubscribe();
  }, [db]);

  const register = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUserProfile = {
        username: result.user.email?.split("@")[0] || "",
        userRole: "user",
        userUid: result.user.uid,
        userEmail: result.user.email || "",
        userAddress: null
      };
      await setDoc(doc(db, "users", result.user.uid), newUserProfile);
      setUser(result.user);
      setUserProfile(newUserProfile);
      localStorage.setItem("userProfile", JSON.stringify(newUserProfile));
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await fetchUserProfile(result.user.uid);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      localStorage.removeItem("userProfile");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userProfile, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
