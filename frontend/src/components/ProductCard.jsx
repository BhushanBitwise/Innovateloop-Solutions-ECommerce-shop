import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist", {
      icon: isLiked ? "💔" : "❤️",
    });
  };

  // Determine badge
  const getBadge = () => {
    if (product.isNew) return { type: "new", text: "NEW" };
    if (product.isSale) return { type: "sale", text: "SALE" };
    if (product.isBestseller) return { type: "bestseller", text: "BESTSELLER" };
    return null;
  };

  const badge = getBadge();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {badge && (
        <div className={`absolute top-4 left-4 z-10 badge badge-${badge.type}`}>
          {badge.text}
        </div>
      )}

      {/* Like Button */}
      <button
        onClick={handleLike}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
      >
        <FiHeart className={`text-xl ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
      </button>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-3"
        >
          <Link
            to={`/product/${product._id}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FiEye className="text-xl" />
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FiShoppingCart className="text-xl" />
          </button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(product.rating || 4))}
            {"☆".repeat(5 - Math.floor(product.rating || 4))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews || 0} reviews)</span>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">${product.oldPrice}</span>
            )}
          </div>
          <span className={`text-sm font-medium ${product.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}