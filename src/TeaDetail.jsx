import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import TeaMenu from "./data/Tea";
import { useCart } from "./CartContext";

export default function TeaDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const tea = TeaMenu.find(t => t.id === id);
  const [sweetness, setSweetness] = useState(100);

  if (!tea) return <h2>ไม่พบเมนูชานี้</h2>;


  const [toppings, setToppings] = useState([]);

  const toggle = (name) => {
    setToppings(prev =>
      prev.includes(name)
        ? prev.filter(t => t !== name)
        : [...prev, name]
    );
  };

  const toppingPrice =
    (toppings.includes("ไข่มุก") ? 5 : 0) +
    (toppings.includes("วิป") ? 10 : 0);

  const totalPrice = tea.price + toppingPrice;

  const add = () => {
    addToCart({
      type: "tea",
      name: tea.name,
      sweetness: `${sweetness}%`,
      toppings,
      price: totalPrice
    });
    alert("เพิ่มลงตะกร้าแล้ว");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>{tea.name}</h1>

      <img
        src={tea.image}
        alt={tea.name}
        style={{ width: "100%", borderRadius: "10px" }}
      />

        <div style={{
          marginTop: "20px",
          padding: "15px",
          background: "#fff8f2",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }}>
          <h3 style={{ marginBottom: "10px" }}>
            ระดับความหวาน: <span style={{ color: "#6f4e37" }}>{sweetness}%</span>
          </h3>

          <input
          type="range"
          min="0"
          max="125"
          step="25"
          value={sweetness}
          onChange={e => setSweetness(Number(e.target.value))}
          className="sweet-slider"
          />

  <div style={{ marginTop: "8px", fontSize: "14px", color: "#6f4e37" }}>
    {sweetness === 0 && "ไม่หวาน 🚫"}
    {sweetness === 25 && "หวานน้อย 🙂"}
    {sweetness === 50 && "หวานปกติ 😋"}
    {sweetness === 75 && "หวานมาก 🤤"}  
    {sweetness === 100 && "หวานสุด 🍬"}
    {sweetness === 125 && "หวานทะลุโลก 🧁"}
  </div>
</div>

<div className="option-group cafe-soft">
  <h3>ท็อปปิ้ง</h3>
  <div className="soft-grid">
    {["ไข่มุก", "วิป"].map(t => (
      <div
        key={t}
        className={`soft-card ${toppings.includes(t) ? "active" : ""}`}
        onClick={() => toggle(t)}
      >
        <div className="emoji">{t === "ไข่มุก" ? "🧋" : "🍦"}</div>
        <div>{t}</div>
        <small>+{t === "ไข่มุก" ? 5 : 10} บาท</small>
      </div>
    ))}
  </div>
</div>

<div className="price-box">รวม {totalPrice} บาท</div>


      <button
        onClick={add}
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
        เพิ่มลงตะกร้า
      </button>
      <Link to="/cart">
      <button style={{ width: "100%", marginTop: "10px", background: "#49be84ff" }}>
        ไปที่ตะกร้า  </button></Link>

      <Link to="/tea">
        <button style={{ width: "100%", marginTop: "10px", background: "#999" }}>
          กลับไปหน้าเครื่องดื่ม </button></Link>
    </div>
  );
}
