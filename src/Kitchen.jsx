import { useEffect, useState } from "react";
import CardButton from "./CardButton";
import { isToday } from "./Logic";


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

    

      const todayOrders = orders.filter(order =>
      isToday(order.time ?? order.timestamp)
      );

   const todayTotal = todayOrders.reduce(
    (sum, order) =>
      sum + order.items.reduce((s, i) => s + i.price, 0),
    0
    );


  const doneOrder = (id) => {
  const updatedOrders = orders.filter(o => o.id !== id);
  setOrders(updatedOrders);
  localStorage.setItem("orders", JSON.stringify(updatedOrders));
};
   
    const confirmPaid = (id) => {
      const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

      const updated = orders.map(o =>
        o.id === id ? { ...o, status: "paid" } : o
      );

      localStorage.setItem("orders", JSON.stringify(updated));
      setOrders(updated);
    };


  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "#f2f2f2"
      }}
    >
      <h1>หน้าครัว</h1>
            {/* 📅 สรุปยอดวันนี้ */}
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          marginBottom: 20,
          fontSize: 18
        }}
      >
        <h2>📅 ยอดขายวันนี้</h2>
        <p> {todayTotal.toLocaleString()} บาท</p>
        <p> {todayOrders.length} ออเดอร์</p>
      </div>

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
      to="/history"
      title="ประวัติการขาย"
      subtitle="ดูออเดอร์ย้อนหลัง"
      />
      
        
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

        orders
        
        .map(order => (
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


            {/*  โต๊ะเวลา  */}
                    <h2>🪑 โต๊ะ {order.table}</h2>
                    <div
                      style={{
                        marginBottom: 10,
                        fontWeight: "bold",
                        color: order.status === "pending" ? "#ff9800" : "#4caf50"
                      }}
                    >
                      {order.status === "pending"
                        ? "🟠 รอชำระเงิน"
                        : "🟢 ชำระแล้ว"}
                    </div>
                  <p>
                    เวลา:{" "}
                    {order.time
                      ? new Date(order.time).toLocaleTimeString()
                      : "-"}
                  </p>

                        {/*  เมนู */}
                    {order.items?.map((item, i) => {
                    const details = [
                    item.size && `ขนาด: ${item.size}`,
                    item.spicy && `เผ็ด: ${item.spicy}`,
                    item.soup && `น้ำซุป: ${item.soup}`,
                    item.noodleType && `เส้น: ${item.noodleType}`,
                    item.vegetable && `ผัก: ${item.vegetable}`,
                    item.toppings?.length && `ท็อปปิ้ง: ${item.toppings.join(", ")}`,
                    item.sweetness && `หวาน: ${item.sweetness}`
                      ].filter(Boolean);

                      return (
                        <div
                          key={i}
                          style={{
                            padding: 12,
                            borderRadius: 10,
                            background: "#fafafa",
                            marginBottom: 12
                          }}
                        >
                          <div style={{ fontWeight: "bold", fontSize: 20 }}>
                            • {item.name}
                          </div>

                          {details.length > 0 && (
                            <div style={{ marginTop: 6 }}>
                              {details.map((d, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    display: "inline-block",
                                    padding: "4px 8px",
                                    margin: "4px 6px 0 0",
                                    fontSize: 20,
                                    background: "#e0f2f1",
                                    borderRadius: 6
                                  }}
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                          )}

                          <div style={{ marginTop: 18, fontWeight: "bold" }}>
                            {item.price} บาท
                          </div>
                        </div>
                      );
                    })}


                    {/* รอชำระเงิน */}
{order.status === "pending" && (
  <button
    onClick={() => confirmPaid(order.id)}
    style={{
      marginTop: 10,
      padding: 15,
      width: "100%",
      background: "#ff9800",
      color: "white",
      border: "none",
      borderRadius: 10,
      fontSize: 18
    }}
  >
    ⏳ รอลูกค้าจ่ายเงิน
  </button>
)}

{/* ลูกค้าแจ้งโอนแล้ว */}
{order.status === "waiting_verify" && (
  <button
    onClick={() => confirmPaid(order.id)}
    style={{
      marginTop: 10,
      padding: 15,
      width: "100%",
      background: "#ffc107",
      color: "black",
      border: "none",
      borderRadius: 10,
      fontSize: 18
    }}
  >
    ✅ ยืนยันรับเงินแล้ว
  </button>
)}

{/* จ่ายเงินเรียบร้อย */}
{order.status === "paid" && (
  <button
    onClick={() => doneOrder(order.id)}
    style={{
      marginTop: 15,
      padding: 15,
      width: "100%",
      background: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: 10,
      fontSize: 20
    }}
  >
    ✅ เสร็จแล้ว
  </button>
)}

          </div>
        ))
      )}
    </div>
  );
}
