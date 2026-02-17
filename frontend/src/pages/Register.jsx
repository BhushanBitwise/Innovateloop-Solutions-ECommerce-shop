// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await register(form.name, form.email, form.password);
//     navigate("/");
//   };

//   return (
//     <form onSubmit={submitHandler} className="max-w-md mx-auto p-4">
//       <input
//         placeholder="Name"
//         className="border w-full p-2 mb-3"
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />
//       <input
//         placeholder="Email"
//         className="border w-full p-2 mb-3"
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="border w-full p-2 mb-3"
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />
//       <button className="bg-green-600 text-white w-full py-2 rounded">
//         Register
//       </button>
//     </form>
//   );
// }




import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { BsBagHeart } from "react-icons/bs";
import toast from "react-hot-toast";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created successfully! 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join UNIK today</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 ml-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
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
                  <span>Create Account</span>
                  <FiArrowRight className="text-lg" />
                </>
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}