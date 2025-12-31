import { useCart } from "./CartContext";
import CardButton from "./CardButton";

export default function Kitchen() {
  const { orders, removeOrder } = useCart();

  return (
    <div style={{ padding: "20px" }}>
      <h1>หน้าครัว </h1>

      <CardButton
        to="/menu"
        title="ไปหน้าเมนู"
        subtitle="เลือกเมนูอาหาร"
      />

      {orders.length === 0 ? (
        <h2 style={{ marginTop: "20px" }}>ยังไม่มีออเดอร์</h2>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "8px"
            }}
          >
            <h2>🪑 โต๊ะ {order.table}</h2>
            <p>เวลา: {order.time}</p>

            {order.items.map((item, i) => (
              <div key={i} style={{ marginLeft: "10px" }}>
                <p>• เมนู: {item.name}</p>
                <p>• ขนาด: {item.size}</p>
                <p>• เผ็ด: {item.spicy}</p>
                <p>• น้ำซุป: {item.soup}</p>
                <p>• เส้น: {item.noodleType}</p>
                <p>• ผัก: {item.vegetable}</p>
                <p>
                  • ท็อปปิ้ง:{" "}
                  {item.toppings.length ? item.toppings.join(", ") : "ไม่มี"}
                </p>
                <strong>ราคา: {item.price} บาท</strong>
                <hr />
              </div>
            ))}

            <button
              onClick={() => removeOrder(order.id)}
              style={{
                marginTop: "10px",
                padding: "10px",
                width: "100%",
                background: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px"
              }}
            >
              ทำเสร็จแล้ว
            </button>
          </div>
        ))
      )}
    </div>
  );
}
