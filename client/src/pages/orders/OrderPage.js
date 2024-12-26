import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Loading from "../Loading";
import { toast } from "react-toastify";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  const orderTableHeaders = [
    "OrderId",
    "UserId",
    "Order Items",
    "Total Amount",
    "Status",
    "CreatedAt",
  ];

  useEffect(() => {
    try {
      // orders koleksiyonunda userId'ye göre filtreleme yapıyoruz
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", user.uid));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const ordersData = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("Order data:", data);
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt,
            };
          });

          console.log("Processed orders:", ordersData); // işlenmiş verileri kontrol et
          setOrders(ordersData);
          setLoading(false);
        },
        (error) => {
          console.error("Snapshot error:", error);
          toast.error("Error loading orders");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Setup error:", error.message);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full bg-white justify-center rounded-r-xl mb-10 relative">
      <div className="flex flex-col mx-24 gap-10">
        <span className="font-bold text-center text-3xl text-black">
          Orders
        </span>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {orderTableHeaders.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.cartItems.map((item, idx) => (
                    <div key={idx}>
                      {item.productName} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${order.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
