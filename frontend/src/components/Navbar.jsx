import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { BsBagHeart } from "react-icons/bs";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-white py-5"
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <BsBagHeart className="text-3xl text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                UNIK
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </form>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/cart" className="relative group">
                <FiShoppingCart className="text-2xl text-gray-700 group-hover:text-blue-600 transition-colors" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/orders" className="text-gray-700 hover:text-blue-600 font-medium">
                    Orders
                  </Link>
                  {user.isAdmin && (
                    <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-5 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-full transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] bg-white shadow-xl z-40 md:hidden"
          >
            <div className="p-5 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>

              {/* Mobile Links */}
              <Link to="/cart" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl">
                <span className="font-medium">Cart</span>
                {cartItems.length > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {user ? (
                <>
                  <Link to="/orders" className="block p-3 hover:bg-gray-50 rounded-xl font-medium">
                    Orders
                  </Link>
                  {user.isAdmin && (
                    <Link to="/admin" className="block p-3 hover:bg-gray-50 rounded-xl font-medium">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left p-3 text-red-500 hover:bg-red-50 rounded-xl font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block p-3 hover:bg-gray-50 rounded-xl font-medium">
                    Login
                  </Link>
                  <Link to="/register" className="block p-3 hover:bg-gray-50 rounded-xl font-medium">
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
}