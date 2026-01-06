import { createContext, useContext, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

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

  // เพิ่ม / ลบ
  const addToCart = (item) => setCart(prev => [...prev, item]);
  const removeFromCart = (index) =>
    setCart(prev => prev.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  // ✅ ส่งออเดอร์ให้ครัว (Firebase)
  const submitOrder = async () => {
    if (cart.length === 0) return;

    const table = localStorage.getItem("tableNumber");

    const docRef = await addDoc(collection(db, "orders"), {
      table,
      items: cart,
      status: "pending",
      createdAt: Date.now()
    });

    setCurrentOrder({
      id: docRef.id,
      table,
      items: cart
    });

    setCart([]); // ล้างตะกร้า
  };

  // ใช้หน้า Checkout
  const clearCurrentOrder = () => setCurrentOrder(null);

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
