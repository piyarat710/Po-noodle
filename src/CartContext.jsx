import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(() => {
  const saved = localStorage.getItem("currentOrder");
  return saved ? JSON.parse(saved) : null;
  });

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
                                                      const submitOrder = async () => {

                                                      try{

                                                      if(cart.length===0){

                                                      alert("ไม่มีสินค้า");

                                                      return;

                                                      }


                                                      // ⭐ กัน table null
                                                      let table = localStorage.getItem("tableNumber");

                                                      if(!table){

                                                      table=1; // default

                                                      }


                                                      // ⭐ รวมราคา
                                                      const total = cart.reduce(

                                                      (sum,i)=>sum+i.price,

                                                      0

                                                      );


                                                      // ⭐ insert
                                                      const { data , error }

                                                      = await supabase

                                                      .from("orders")

                                                      .insert({

                                                      table_number:Number(table),

                                                      items:cart,

                                                      total_price:total,

                                                      status:"pending"

                                                      })

                                                      .select()

                                                      .single();


                                                      if(error){

                                                      console.error("ORDER ERROR :",error);

                                                      alert(error.message);

                                                      return;

                                                      }


                                                      // success
                                                      setCurrentOrder(data);

                                                      localStorage.setItem(

                                                      "currentOrder",

                                                      JSON.stringify(data)

                                                      );


                                                      setCart([]);

                                                      alert("ส่งเข้าครัวแล้ว !");


                                                      }catch(err){

                                                      console.error(err);

                                                      alert("ส่งออเดอร์ไม่สำเร็จ");

                                                      }

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
