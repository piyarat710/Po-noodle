import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  // โหลด cart
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  // sync cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) =>
    setCart(prev => [...prev, item]);

  const removeFromCart = (index) =>
    setCart(prev => prev.filter((_, i) => i !== index));

  const clearCart = () => setCart([]);

  // ✅ ส่งออเดอร์ให้ครัว (localStorage)
  const submitOrder = () => {
    if (cart.length === 0) return;

    const table = localStorage.getItem("tableNumber");

    const newOrder = {
      id: Date.now(),
      table,
      items: cart,
      time: new Date().toLocaleTimeString()
    };

    const prev =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = [...prev, newOrder];

    localStorage.setItem("orders", JSON.stringify(updated));

    setCurrentOrder(newOrder);
    setCart([]);
  };

  const clearCurrentOrder = () =>
    setCurrentOrder(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        currentOrder,
        addToCart,
        removeFromCart,
        submitOrder,
        clearCart,
        clearCurrentOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
