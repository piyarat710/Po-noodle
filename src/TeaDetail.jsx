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

      <h3 style={{ marginTop: "20px" }}>ระดับความหวาน: {sweetness}%</h3>

      <input
        type="range"
        min="0"
        max="125"
        step="25"
        value={sweetness}
        onChange={e => setSweetness(e.target.value)}
        style={{ width: "100%" }}
      />
      <p>{sweetness}%</p>

            {/* ท็อปปิ้ง */}
      <h3>ท็อปปิ้ง</h3>
      {["ไข่มุก", "วิป"].map(t => (
        <label key={t} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={toppings.includes(t)}
            onChange={() => toggle(t)}
          />
          {" "}
          {t} (+{t === "ไข่มุก" ? 5 : 10})
        </label>
      ))}

      <h2 style={{ marginTop: "20px" }}>
        ราคา {totalPrice} บาท
      </h2>

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
      <button style={{ width: "100%", marginTop: "10px" }}>
        ไปที่ตะกร้า  </button></Link>

      <Link to="/tea">
        <button style={{ width: "100%", marginTop: "10px" }}>
          กลับไปหน้าเครื่องดื่ม </button></Link>
    </div>
  );
}
