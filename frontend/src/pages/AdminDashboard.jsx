import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const { products, fetchProducts } = useContext(ProductContext);
  const [search, setSearch] = useState("");

  const deleteHandler = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <Link
          to="/admin/product"
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          <FiPlus />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Stock</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <img
                    src={product.image || "https://via.placeholder.com/50"}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.countInStock > 0 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {product.countInStock > 0 ? `${product.countInStock} in stock` : "Out of stock"}
                  </span>
                </td>
                <td className="px-6 py-4">{product.category || "Uncategorized"}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <Link
                      to={`/admin/product/${product._id}`}
                      className="text-blue-600 hover:text-blue-800 p-2"
                    >
                      <FiEdit className="text-xl" />
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id, product.name)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}