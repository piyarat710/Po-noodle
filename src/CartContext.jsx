import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null); // ✅ สำคัญมาก



// โหลด cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

// sync cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // โหลด orders จาก localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // sync orders → localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // เพิ่มลงตะกร้า
  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  // ลบจากตะกร้า
  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  // ล้างตะกร้า (ใช้ตอนจ่ายเงิน)
  const clearCart = () => {
    setCart([]);
  };

  // ส่งออเดอร์ให้ครัว
  const submitOrder = () => {
    if (cart.length === 0) return;

    const table = localStorage.getItem("tableNumber");

    const newOrder = {
      id: Date.now(),
      table,
      items: cart,
      time: new Date().toLocaleTimeString(),
      paid: false
    };

    setOrders(prev => [...prev, newOrder]);
    setCurrentOrder(newOrder);   // ⭐ เก็บไว้ใช้หน้า Checkout
    setCart([]);                 // ล้างตะกร้า
  };

  // ครัวกดทำเสร็จ
  const removeOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const payOrder = () => {
  if (!currentOrder) return;

  // อัปเดต paid = true
  setOrders(prev =>
    prev.map(o =>
      o.id === currentOrder.id ? { ...o, paid: true } : o
    )
  );

  setCurrentOrder(null); // ล้างเฉพาะ order ปัจจุบัน
};

  // เคลียร์ currentOrder หลังจ่ายเงิน
  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        currentOrder,
        addToCart,
        removeFromCart,
        submitOrder,
        clearCart,
        clearCurrentOrder,
        removeOrder,
        payOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
