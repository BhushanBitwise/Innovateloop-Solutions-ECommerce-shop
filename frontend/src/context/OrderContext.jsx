import { createContext } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

  const createOrder = async (orderData) => {
    await API.post("/orders", orderData);
    toast.success("Order Placed Successfully");
  };

  const getMyOrders = async () => {
    const { data } = await API.get("/orders/myorders");
    return data;
  };

  return (
    <OrderContext.Provider value={{ createOrder, getMyOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
