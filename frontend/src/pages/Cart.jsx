import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <FiShoppingBag className="text-8xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet</p>
        <Link
          to="/"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.length} items)</h2>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={item.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-blue-600 font-bold text-xl mb-2">${item.price}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <select
                        value={item.qty}
                        onChange={(e) => addToCart(item, Number(e.target.value))}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[...Array(10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            Qty: {x + 1}
                          </option>
                        ))}
                      </select>
                      
                      <button
                        onClick={() => {
                          removeFromCart(item._id);
                          toast.success("Item removed from cart");
                        }}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                    
                    <span className="font-bold text-lg">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mt-4"
          >
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 mb-3"
            >
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-500 text-center">
              Secure checkout powered by UNIK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}