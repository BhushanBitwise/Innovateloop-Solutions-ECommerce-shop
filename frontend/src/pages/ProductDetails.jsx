// import { useParams } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import API from "../api/axios";
// import Loader from "../components/Loader";
// import { CartContext } from "../context/CartContext";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const { addToCart } = useContext(CartContext);
//   const [product, setProduct] = useState(null);
//   const [qty, setQty] = useState(1);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const { data } = await API.get(`/products/${id}`);
//       setProduct(data);
//     };
//     fetchProduct();
//   }, [id]);

//   if (!product) return <Loader />;

//   return (
//     <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-6">
//       <img src={product.image} className="w-full rounded" />
//       <div>
//         <h2 className="text-2xl font-bold">{product.name}</h2>
//         <p className="text-blue-600 text-xl">${product.price}</p>
//         <p className="my-3">{product.description}</p>
//         <p>
//           {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
//         </p>

//         <select
//           value={qty}
//           onChange={(e) => setQty(Number(e.target.value))}
//           className="border p-2 my-2"
//         >
//           {[...Array(product.countInStock).keys()].map((x) => (
//             <option key={x + 1}>{x + 1}</option>
//           ))}
//         </select>

//         <button
//           onClick={() => addToCart(product, qty)}
//           className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
//         >
//           Add To Cart
//         </button>
//       </div>
//     </div>
//   );
// }





import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Loader from "../components/Loader";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist", {
      icon: isLiked ? "💔" : "❤️",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Skeleton */}
            <div className="aspect-square bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl animate-pulse" />
            
            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 animate-pulse" />
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Main Image - Sirf ek image jo product me hai */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl aspect-square">
              <img
                src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges - Sirf agar product me honge to dikhenge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                    NEW
                  </span>
                )}
                {product.isSale && (
                  <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                    SALE
                  </span>
                )}
              </div>

              {/* Like Button */}
              <button
                onClick={handleLike}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              >
                <FiHeart className={`text-xl ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Title & Rating */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(product.rating || 4)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.reviews || 145})
                  </span>
                </div>
                <span className="flex items-center text-green-600 text-xs">
                  <MdVerified className="mr-1" />
                  Verified
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end space-x-3">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">
                    Save ${(product.oldPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className={`flex items-center space-x-2 ${
              product.countInStock > 0 ? "text-green-600" : "text-red-600"
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                product.countInStock > 0 ? "bg-green-600 animate-pulse" : "bg-red-600"
              }`} />
              <span className="font-medium text-sm">
                {product.countInStock > 0 
                  ? `${product.countInStock} in stock` 
                  : "Out of stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed py-3 border-y">
              {product.description || "Premium quality product designed for everyday use. Features durable construction and elegant design."}
            </p>

            {/* Features - Simple 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="flex items-center space-x-2">
                <FiTruck className="text-blue-600 text-lg" />
                <span className="text-sm text-gray-600">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiRefreshCw className="text-blue-600 text-lg" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiShield className="text-blue-600 text-lg" />
                <span className="text-sm text-gray-600">2 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 text-lg">✓</span>
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 pt-2">
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                disabled={product.countInStock === 0}
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    Qty: {x + 1}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiShoppingCart className="text-xl" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Secure Payment Note */}
            <p className="text-xs text-gray-400 text-center pt-3">
              🔒 Secure transaction • Buyer protection
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}