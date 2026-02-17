import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AddEditProduct from "./pages/AddEditProduct";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route
                        path="/checkout"
                        element={
                          <ProtectedRoute>
                            <Checkout />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/orders"
                        element={
                          <ProtectedRoute>
                            <Orders />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin"
                        element={
                          <AdminRoute>
                            <AdminDashboard />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/product"
                        element={
                          <AdminRoute>
                            <AddEditProduct />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/admin/product/:id"
                        element={
                          <AdminRoute>
                            <AddEditProduct />
                          </AdminRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AnimatePresence>
                </main>
                <Footer />
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: "#363636",
                      color: "#fff",
                      borderRadius: "10px",
                    },
                  }}
                />
              </div>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}