import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiSmartphone, 
  FiMonitor,        // Instead of FiLaptop
  FiCamera, 
  FiHeadphones,
  FiClock,          // Instead of FiWatch
  FiTv 
} from "react-icons/fi";

const categories = [
  { id: "all", name: "All Products", icon: null },
  { id: "electronics", name: "Electronics", icon: FiSmartphone },
  { id: "laptops", name: "Laptops", icon: FiMonitor },      // Fixed
  { id: "cameras", name: "Cameras", icon: FiCamera },
  { id: "audio", name: "Audio", icon: FiHeadphones },
  { id: "wearables", name: "Wearables", icon: FiClock },    // Fixed
  { id: "tv", name: "TV & Home", icon: FiTv },
];

export default function CategoryFilter({ onSelectCategory }) {
  const [active, setActive] = useState("all");

  const handleClick = (categoryId) => {
    setActive(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="py-6 overflow-x-auto">
      <div className="flex space-x-3 min-w-max px-4 md:px-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                active === category.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {Icon && <Icon className="text-xl" />}
              <span>{category.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}