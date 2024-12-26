const firebase = require("../db");
const User = require("../models/User");
const admin = require("firebase-admin");
const auth = admin.auth();
const db = firebase.collection("users");

const checkIfUserAdmin = async (req, res, next) => {
  const { userId } = req.params;
  try {
    // Firestore'dan kullanıcı rolünü almak
    const userDocRef = db.doc(userId.trim());
    const userDoc = await userDocRef.get(); // .get() ile dokümanın içeriğini alın

    if (userDoc.exists) {
      const userData = userDoc.data();
      const userRole = userData.userRole;

      // Kullanıcı rolünü döndür
      req.userRole = userRole; // userRole'ü req'e ekliyoruz
      return res.status(200).json({ role: userRole });
    } else {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası.", error });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const usersSnapshot = await db.get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const changeUserRole = async (req, res, next) => {
  const { userId } = req.params;
  const { newRole } = req.body;

  try {
    const userDocRef = db.doc(userId.trim());
    await userDocRef.update({
      userRole: newRole,
    });
    res.status(200).json(`User Role successfully changed to ${newRole}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to change userRole" });
  }
};

const deleteUser = async (req, res, next) => {
  const { userUid } = req.params;

  try {
    const userDocRef = db.doc(userUid.trim());
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found." });
    }

    const userData = userDoc.data();
    if (userData.userRole === "admin") {
      return res
        .status(400)
        .json({ message: "Admin users cannot be deleted." });
    }

    await userDocRef.delete();
    await auth.deleteUser(userUid);

    return res.status(200).json({ message: "User successfully deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error });
  }
};

const addAdress = async (req, res, next) => {
  const { userId } = req.params;
  const { newAddress } = req.body;

  try {
    const userDocRef = db.doc(userId.trim());
    await userDocRef.update({
      userAddress: newAddress,
    });
    res.status(200).json(`User address successfully changed to ${newAddress}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to change userAddress" });
  }
};

const fetchUserData = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userDocRef = db.doc(userId.trim());
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();

      req.userData = userData;
      return res.status(200).json({ userData: userData });
    } else {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası.", error });
  }
};

const updateUserDetails = async (req, res, next) => {
  const { userId } = req.params;
  const { username, userAddress } = req.body;
  console.log(userId, username, userAddress);

  try {
    const userDocRef = db.doc(userId.trim());
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    await userDocRef.update({
      username: username,
      userAddress: userAddress,
    });

    return res.status(200).json({
      message: "Kullanıcı bilgileri başarıyla güncellendi.",
      updatedFields: { username, userAddress },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Kullanıcı bilgileri güncellenirken bir hata oluştu.",
      error,
    });
  }
};

module.exports = {
  checkIfUserAdmin,
  getAllUsers,
  changeUserRole,
  deleteUser,
  addAdress,
  fetchUserData,
  updateUserDetails,
};
