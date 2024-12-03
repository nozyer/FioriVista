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

module.exports = {
  checkIfUserAdmin,
};
