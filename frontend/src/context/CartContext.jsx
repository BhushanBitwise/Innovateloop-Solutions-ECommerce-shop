import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty) => {
    const exist = cartItems.find((x) => x._id === product._id);

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...x, qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
    }

    toast.success("Added to cart");
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
    toast.success("Removed from cart");
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
