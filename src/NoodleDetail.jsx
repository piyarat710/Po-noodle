import { useParams, Link } from "react-router-dom";
import NoodleMenu from "./data/noodles";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function NoodleDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const noodle = NoodleMenu.find((n) => n.id === id);

  if (!noodle) {
    return <h2>ไม่พบเมนูนี้</h2>;
  }

  // ===== state ตัวเลือก =====
  const [size, setSize] = useState("ปกติ");
  const [spicy, setSpicy] = useState("");
  const [soup, setSoup] = useState("");
  const [noodleType, setNoodleType] = useState("");
  const [vegetable, setVegetable] = useState("");
  const [toppings, setToppings] = useState([]);

  // ===== options =====
  const spicyOptions = ["ไม่เผ็ด", "เผ็ดน้อย", "เผ็ดกลาง", "เผ็ดมาก"];
  const soupOptions = ["น้ำใส", "ต้มยำ", "น้ำตก", "เย็นตาโฟ", "เย็นตาโฟต้มยำ"];
  const noodleTypes = ["เส้นเล็ก", "เส้นใหญ่", "บะหมี่", "วุ้นเส้น", "มาม่า"];
  const vegetableOptions = ["ใส่ผัก", "ไม่ใส่ผัก"];

  // ===== คำนวณราคา =====
  const sizePrice = size === "พิเศษ" ? 10 : 0;
  const toppingPrice = toppings.length * 10;
  const totalPrice = noodle.basePrice + sizePrice + toppingPrice;

  const toggleTopping = (name) => {
    setToppings((prev) =>
      prev.includes(name)
        ? prev.filter((t) => t !== name)
        : [...prev, name]
    );
  };

  // ===== เพิ่มลงตะกร้า =====
  const handleAddToCart = () => {
    addToCart({
      id: noodle.id,
      name: noodle.name,
      spicy,
      soup,
      noodleType,
      vegetable,
      size,
      toppings,
      price: totalPrice
    });

    alert("เพิ่มลงตะกร้าแล้ว");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>{noodle.name}</h1>

      <img
        src={noodle.image}
        alt={noodle.name}
        style={{ width: "100%", borderRadius: "10px" }}
      />

      {/* ขนาด */}
      <h3>ขนาด</h3>
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="ปกติ">ปกติ</option>
        <option value="พิเศษ">พิเศษ (+10)</option>
      </select>

      {/* ความเผ็ด */}
      <h3>ความเผ็ด</h3>
      <select value={spicy} onChange={(e) => setSpicy(e.target.value)}>
        <option value="">-- เลือก --</option>
        {spicyOptions.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      {/* น้ำซุป */}
      <h3>น้ำซุป</h3>
      <select value={soup} onChange={(e) => setSoup(e.target.value)}>
        <option value="">-- เลือก --</option>
        {soupOptions.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      {/* เส้น */}
      <h3>เส้น</h3>
      <select value={noodleType} onChange={(e) => setNoodleType(e.target.value)}>
        <option value="">-- เลือก --</option>
        {noodleTypes.map((n) => (
          <option key={n}>{n}</option>
        ))}
      </select>

      {/* ผัก */}
      <h3>ผัก</h3>
      <select value={vegetable} onChange={(e) => setVegetable(e.target.value)}>
        <option value="">-- เลือก --</option>
        {vegetableOptions.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>

      {/* ท็อปปิ้ง */}
      <h3>ท็อปปิ้ง (+10)</h3>
      {["ลูกชิ้น", "ไข่"].map((t) => (
        <label key={t} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={toppings.includes(t)}
            onChange={() => toggleTopping(t)}
          />{" "}
          {t}
        </label>
      ))}

      {/* สรุป */}
      <div style={{ marginTop: "20px", background: "#f5f5f5", padding: "10px", borderRadius: "8px" }}>
        <h3>สรุปออเดอร์</h3>
        <p>เผ็ด: {spicy || "-"}</p>
        <p>น้ำซุป: {soup || "-"}</p>
        <p>เส้น: {noodleType || "-"}</p>
        <p>ผัก: {vegetable || "-"}</p>
        <p>ท็อปปิ้ง: {toppings.length ? toppings.join(", ") : "ไม่มี"}</p>
        <h2>ราคารวม: {totalPrice} บาท</h2>
      </div>

      {/* ปุ่มเพิ่มลงตะกร้า */}
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          background: "#ff9800",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        เพิ่มลงตะกร้า
      </button>
      
      <Link to="/Cart">
      <button style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          background: "#25e90fff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
           }}>
       ไปที่ตะกร้า
       </button>
      </Link>


      <Link to="/Noodles">
        <button        
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          background: "#d29c4bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
          }}>
          กลับไปเลือกเมนู
        </button>
      </Link>
    </div>
  );
}
