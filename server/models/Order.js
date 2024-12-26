class Order {
  constructor(orderId, userId, cartItems = [], totalAmount, status, createdAt) {
    this.orderId = orderId;
    this.userId = userId;
    this.cartItems = cartItems;
    this.totalAmount = totalAmount;
    this.status = status || "Pending";
    this.createdAt = createdAt || new Date();
  }
}
