const firebase = require("../db");
const Order = require("../models/Order");
const admin = require("firebase-admin");
const auth = admin.auth();
const db = firebase.collection("orders");

const createOrder = async (req, res) => {
  try {
    const { orderId, userId, cartItems, totalAmount, status, createdAt } =
      req.body;

    const orderRef = db.doc(orderId.trim());
    await orderRef.set({
      orderId,
      userId,
      cartItems,
      totalAmount,
      status,
      createdAt,
    });

    res.status(201).json({
      message: "Order created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create order", details: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    
    const firebase = require("../db");
    const ordersCollection = firebase.collection("orders");

    const snapshot = await ordersCollection
      .where("userUid", "==", userId)
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    const orders = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders", details: error });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};
