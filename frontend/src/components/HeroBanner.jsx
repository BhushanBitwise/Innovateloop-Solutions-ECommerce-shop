import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% off",
    description: "On all electronics",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh Styles",
    description: "Check out the latest trends",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Flash Sale",
    subtitle: "24 Hours Only",
    description: "Grab them before they're gone",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200",
    color: "from-green-600 to-teal-600",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl mx-4 md:mx-8 my-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
          <img
            src={banners[current].image}
            alt={banners[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-16 left-16 z-20 text-white">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-2"
            >
              {banners[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-light mb-2"
            >
              {banners[current].subtitle}
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg mb-6"
            >
              {banners[current].description}
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl hover:bg-white transition-colors"
      >
        <FiChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl hover:bg-white transition-colors"
      >
        <FiChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "w-8 bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}