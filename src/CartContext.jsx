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

        useEffect(() => {
        const savedOrder = JSON.parse(localStorage.getItem("currentOrder"));
        if (savedOrder) {
          setCurrentOrder(savedOrder);
        }
      }, []);

  const addToCart = (item) =>
    setCart(prev => [...prev, item]);

  const removeFromCart = (index) =>
    setCart(prev => prev.filter((_, i) => i !== index));

  const clearCart = () => setCart([]);

  // ✅ ส่งออเดอร์ให้ครัว (localStorage)
  const submitOrder = () => {
    if (cart.length === 0) return;

    const table = localStorage.getItem("tableNumber");
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    
    const newOrder = {
      id: Date.now(),
      table,
      items: cart,
      time: Date.now(),
      status: "pending",
      month: monthKey
    };

    // 🔴 สำหรับหน้า Kitchen (ลบได้)
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify([...orders, newOrder])
    );

    // ⭐ เพิ่ม: สำหรับหน้า Stats (ห้ามลบ)
    const history =
      JSON.parse(localStorage.getItem("orderHistory")) || [];
    localStorage.setItem(
      "orderHistory",
      JSON.stringify([...history, newOrder])
    );

    setCurrentOrder(newOrder);
    localStorage.setItem("currentOrder", JSON.stringify(newOrder));
    setCart([]);
  };


                                                             const payOrder = () => {
                                                              if (!currentOrder) return;

                                                              const orders =
                                                                JSON.parse(localStorage.getItem("orders")) || [];

                                                              const history =
                                                                JSON.parse(localStorage.getItem("orderHistory")) || [];

                                                              const updatedOrders = orders.map(o =>
                                                                o.id === currentOrder.id
                                                                  ? { ...o, status: "waiting_verify" }
                                                                  : o
                                                              );

                                                              const updatedHistory = history.map(o =>
                                                                o.id === currentOrder.id
                                                                  ? { ...o, status: "waiting_verify" }
                                                                  : o
                                                              );

                                                              localStorage.setItem("orders", JSON.stringify(updatedOrders));
                                                              localStorage.setItem("orderHistory", JSON.stringify(updatedHistory));

                                                              // 🔥 ค่อยลบตอนท้าย
                                                              localStorage.removeItem("currentOrder");

                                                              setCurrentOrder(null);

                                                              alert("แจ้งร้านแล้ว รอร้านตรวจสอบการชำระเงิน");

                                                              window.location.href = "/menu";
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
        clearCurrentOrder,
        payOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
