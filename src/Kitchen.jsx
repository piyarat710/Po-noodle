import { useEffect, useState } from "react";
import CardButton from "./CardButton";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);

  // ✅ ออกจากระบบ (ต้องอยู่นอก useEffect)
  const logout = () => {
    localStorage.removeItem("isStaff"); // ใช้ key เดียวกับ ProtectedRoute
    window.location.href = "/login";
  };

  useEffect(() => {
    
   const loadOrders = () => {
  try {
    const data = JSON.parse(localStorage.getItem("orders"));
    setOrders(Array.isArray(data) ? data : []);
  } catch {
    setOrders([]);
  }
};


    loadOrders(); // โหลดทันที
    const interval = setInterval(loadOrders, 3000);

    return () => clearInterval(interval);
  }, []);

  const doneOrder = (id) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "#f2f2f2"
      }}
    >
      <h1>👨‍🍳 หน้าครัว</h1>

      <button
        onClick={logout}
        style={{
          marginBottom: 20,
          padding: 10,
          background: "#f44336",
          color: "white",
          border: "none",
          borderRadius: 6
        }}
      >
        ออกจากระบบ
      </button>

      <CardButton
        to="/menu"
        title="ไปหน้าเมนู"
        subtitle="กลับไปดูฝั่งลูกค้า"
      />

      {orders.length === 0 ? (
        <h2 style={{ marginTop: "20px" }}>
          ยังไม่มีออเดอร์
        </h2>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              fontSize: "18px"
            }}
          >
            <h2>🪑 โต๊ะ {order.table}</h2>
            <p>เวลา: {order.time}</p>

            {order.items.map((item, i) => (
              <div key={i}>
                <p>• {item.name}</p>
                <strong>{item.price} บาท</strong>
                <hr />
              </div>
            ))}

            <button
              onClick={() => doneOrder(order.id)}
              style={{
                marginTop: "15px",
                padding: "15px",
                width: "100%",
                background: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "20px"
              }}
            >
              ✅ ทำเสร็จแล้ว
            </button>
          </div>
        ))
      )}
    </div>
  );
}
