import { useEffect, useState, useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { motion } from "framer-motion";
import { FiPackage, FiCalendar, FiMapPin, FiCreditCard } from "react-icons/fi";

export default function Orders() {
  const { getMyOrders } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-green-100 text-green-600";
      case "shipped": return "bg-blue-100 text-blue-600";
      case "processing": return "bg-yellow-100 text-yellow-600";
      case "cancelled": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <FiPackage className="text-8xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">Start shopping to place your first order</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h2 className="text-3xl font-bold mb-8">My Orders</h2>
      
      <div className="space-y-6">
        {orders.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Order ID</p>
                  <p className="font-mono font-bold">#{order._id?.slice(-8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Total Amount</p>
                  <p className="text-2xl font-bold">${order.totalPrice?.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <FiCalendar className="text-2xl text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FiMapPin className="text-2xl text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Shipping Address</p>
                    <p className="font-semibold">{order.shippingAddress?.address || "N/A"}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FiCreditCard className="text-2xl text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.isPaid ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                <div className="space-y-3">
                  {order.orderItems?.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <p className="font-bold text-blue-600">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Status */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                    Status: {order.status || "Processing"}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-semibold">
                    Track Order →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}