// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//     navigate("/");
//   };

//   return (
//     <form onSubmit={submitHandler} className="max-w-md mx-auto p-4">
//       <input
//         type="email"
//         placeholder="Email"
//         className="border w-full p-2 mb-3"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="border w-full p-2 mb-3"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button className="bg-blue-600 text-white w-full py-2 rounded">
//         Login
//       </button>
//     </form>
//   );
// }










import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { BsBagHeart } from "react-icons/bs";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back! 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4"
          >
            <BsBagHeart className="text-3xl text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Loged In</span>
                  <FiArrowRight className="text-lg" />
                </>
              )}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline">
              Create Account
            </Link>
          </p>
        </div>

        {/* Demo Credentials (Optional - Remove if not needed) */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setEmail("demo@unik.com");
              setPassword("demo123");
            }}
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Use demo credentials
          </button>
        </div>
      </motion.div>
    </div>
  );
}