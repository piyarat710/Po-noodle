import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // โหลด orders จาก localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // sync orders → localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const submitOrder = () => {
    const tableNumber = localStorage.getItem("tableNumber");
    if (cart.length === 0) return;

    setOrders(prev => [
      ...prev,
      {
        id: Date.now(),
        table: tableNumber, 
        items: cart,
        time: new Date().toLocaleTimeString()
      }
    ]);

    setCart([]); // ล้างตะกร้า
  };

  const removeOrder = (id) => {
  const updatedOrders = orders.filter(o => o.id !== id);
  setOrders(updatedOrders);
  localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        submitOrder,
        removeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
