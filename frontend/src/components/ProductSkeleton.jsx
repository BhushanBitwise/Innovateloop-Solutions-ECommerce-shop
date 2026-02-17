import { motion } from "framer-motion";

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse" />
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 animate-pulse" />
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
      </div>
    </div>
  );
}