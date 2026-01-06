import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "./firebase";
import CardButton from "./CardButton";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(data);
    });

    return () => unsubscribe();
  }, []);

  // ✅ ครัวกดทำเสร็จ
  const doneOrder = async (id) => {
    await updateDoc(doc(db, "orders", id), {
      status: "done"
    });
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

      <CardButton
        to="/menu"
        title="ไปหน้าเมนู"
        subtitle="กลับไปดูฝั่งลูกค้า"
      />

      {orders.length === 0 ? (
        <h2 style={{ marginTop: "20px" }}>ยังไม่มีออเดอร์</h2>
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

            {order.items.map((item, i) => (
              <div key={i}>
                <p>• {item.name}</p>
                <p>  ขนาด: {item.size} | เผ็ด: {item.spicy}</p>
                <p>  เส้น: {item.noodleType} | ผัก: {item.vegetable}</p>
                <p>  ท็อปปิ้ง: {item.toppings.join(", ") || "ไม่มี"}</p>
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
