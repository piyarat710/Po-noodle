import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Cart() {
  const {
    cart,
    currentOrder,
    removeFromCart,
    submitOrder
  } = useCart();

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  if (cart.length === 0 && !currentOrder) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>ตะกร้าว่าง</h2>
        <Link to="/menu">ไปเลือกเมนู</Link>
      </div>
    );
  }

  return (
    <div className="cart-box" style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>ตะกร้าสินค้าของคุณ</h1>

      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginTop: "10px"
          }}
        >
          <h3>{item.name}</h3>

          {item.type !== "tea" && (
            <>
              <p>เผ็ด: {item.spicy}</p>
              <p>น้ำซุป: {item.soup}</p>
              <p>เส้น: {item.noodleType}</p>
              <p>ผัก: {item.vegetable}</p>
              <p>ขนาด: {item.size}</p>
              <p>
                ท็อปปิ้ง:{" "}
                {item.toppings?.length ? item.toppings.join(", ") : "ไม่มี"}
              </p>
            </>
          )}

          {item.type === "tea" && (
            <>
              <p>ความหวาน: {item.sweetness}</p>
              <p>
                ท็อปปิ้ง:{" "}
                {item.toppings?.length ? item.toppings.join(", ") : "ไม่มี"}
              </p>
            </>
          )}

          <strong>ราคา: {item.price} บาท</strong>

          <button
            onClick={() => removeFromCart(index)}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "12px",
              background: "#fb4525",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px"
            }}
          >
            ลบ
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h2 style={{ marginTop: "20px" }}>
            รวมทั้งหมด: {total} บาท
          </h2>

          <button
            onClick={submitOrder}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "15px",
              fontSize: "18px",
              background: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            ส่งออเดอร์ให้ครัว
          </button>
        </>
      )}

      {currentOrder && (
        <Link to="/checkout">
          <button style={{ width: "100%", marginTop: 10, background: "#6ad13a", }}>
            ไปชำระเงิน
          </button>
        </Link>
      )}

      <Link to="/menu">
        <button style={{ width: "100%", marginTop: 10 }}>
          กลับไปเลือกเมนู
        </button>
      </Link>
    </div>
  );
}
