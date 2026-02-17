import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import HeroBanner from "../components/HeroBanner";
import CategoryFilter from "../components/CategoryFilter";
import { motion } from "framer-motion";
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";

export default function Home() {
  const { products, loading } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const features = [
    { icon: FiTruck, title: "Free Shipping", desc: "On orders over $50" },
    { icon: FiShield, title: "Secure Payment", desc: "100% secure transactions" },
    { icon: FiRefreshCw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: FiHeadphones, title: "24/7 Support", desc: "Dedicated support" },
  ];

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="h-[400px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Features Bar */}
      <div className="bg-white shadow-sm py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <feature.icon className="text-3xl text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container-custom py-8">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <CategoryFilter onSelectCategory={setSelectedCategory} />
      </div>

      {/* Products Grid */}
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {selectedCategory === "all" ? "All Products" : `${selectedCategory}`}
          </h2>
          <p className="text-gray-500">{filteredProducts.length} products found</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}