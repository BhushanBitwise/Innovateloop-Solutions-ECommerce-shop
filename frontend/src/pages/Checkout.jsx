// import { useState, useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import { OrderContext } from "../context/OrderContext";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const { cartItems } = useContext(CartContext);
//   const { createOrder } = useContext(OrderContext);
//   const navigate = useNavigate();

//   const [address, setAddress] = useState("");

//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   const placeOrder = async () => {
//     await createOrder({
//       orderItems: cartItems,
//       shippingAddress: { address },
//       totalPrice: total,
//     });
//     navigate("/orders");
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h2 className="text-xl font-bold">Checkout</h2>
//       <textarea
//         className="border w-full p-2 my-3"
//         placeholder="Enter Shipping Address"
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       <h3>Total: ${total}</h3>
//       <button
//         onClick={placeOrder}
//         className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
//       >
//         Place Order
//       </button>
//     </div>
//   );
// }













import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMapPin, 
  FiCreditCard, 
  FiTruck, 
  FiShoppingBag,
  FiChevronRight,
  FiEdit,
  FiCheckCircle,
  FiClock,
  FiPercent,
  FiGift
} from "react-icons/fi";
import { BsBagHeart, BsShieldCheck } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartItems } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [savingAddress, setSavingAddress] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Redirect if cart empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% discount if coupon applied
  const total = subtotal + shipping + tax - discount;

  const placeOrder = async () => {
    // Validation
    if (!address.trim()) {
      toast.error("Please enter shipping address");
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        orderItems: cartItems,
        shippingAddress: { 
          address,
          instructions: deliveryInstructions 
        },
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        discount: discount,
        totalPrice: total,
        coupon: appliedCoupon?.code,
      });
      
      toast.success("Order placed successfully! 🎉");
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "unik10") {
      setAppliedCoupon({ code: "UNIK10", discount: 10 });
      toast.success("Coupon applied! 10% discount");
      setCouponCode("");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <BsBagHeart className="text-3xl text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Checkout</h1>
          </div>
          <Link to="/cart" className="text-blue-600 hover:text-blue-800 flex items-center">
            <FiEdit className="mr-2" />
            Edit Cart
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= s 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
                  : "bg-gray-200 text-gray-500"
              }`}>
                {step > s ? <FiCheckCircle /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > s ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FiMapPin className="text-xl text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold">Delivery Address</h2>
                </div>
                {step === 1 && address && (
                  <button
                    onClick={() => setStep(2)}
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    Next <FiChevronRight className="inline" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />

                <input
                  type="text"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="Delivery instructions (optional)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={savingAddress}
                    onChange={(e) => setSavingAddress(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Save this address for future orders</span>
                </label>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FiCreditCard className="text-xl text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold">Payment Method</h2>
                </div>
                {step === 2 && (
                  <button
                    onClick={() => setStep(3)}
                    className="text-blue-600 font-medium hover:text-blue-800"
                  >
                    Next <FiChevronRight className="inline" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["card", "upi", "cod"].map((method) => (
                  <label
                    key={method}
                    className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <span className="capitalize font-medium">
                      {method === "card" && "💳 Card"}
                      {method === "upi" && "📱 UPI"}
                      {method === "cod" && "💰 Cash on Delivery"}
                    </span>
                  </label>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Demo: 4242 4242 4242 4242</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Card number"
                      className="col-span-2 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Order Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <FiCheckCircle className="text-xl text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold">Review Order</h2>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <p className="font-bold text-blue-600">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={!couponCode || appliedCoupon}
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <FiCheckCircle className="mr-1" />
                    Coupon {appliedCoupon.code} applied (10% off)
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-y">
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
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Delivery Estimate */}
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <FiClock />
                <span>Estimated delivery: 3-5 business days</span>
              </div>

              {/* Place Order Button */}
              <button
                onClick={placeOrder}
                disabled={loading || !address || step < 3}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiShoppingBag className="text-xl" />
                    <span>Place Order • ${total.toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Security Badges */}
              <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
                <span className="flex items-center">
                  <BsShieldCheck className="mr-1" /> Secure
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <MdVerified className="mr-1 text-green-500" /> Protected
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}