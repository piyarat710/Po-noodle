import { useParams, Link } from "react-router-dom";
import NoodleMenu from "./data/Noodles";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function NoodleDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const noodle = NoodleMenu.find(n => n.id === id);

  if (!noodle) return <h2>ไม่พบเมนูนี้</h2>;

  const [size, setSize] = useState("ปกติ");
  const [spicy, setSpicy] = useState("");
  const [soup, setSoup] = useState("");
  const [noodleType, setNoodleType] = useState("");
  const [vegetable, setVegetable] = useState("");
  const [toppings, setToppings] = useState([]);

  const totalPrice =
    noodle.basePrice +
    (size === "พิเศษ" ? 10 : 0) +
    toppings.length * 10;

  const toggleTopping = (t) => {
    setToppings(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const add = () => {
    addToCart({
      name: noodle.name,
      size,
      spicy,
      soup,
      noodleType,
      vegetable,
      toppings,
      price: totalPrice
    });
    alert("เพิ่มลงตะกร้าแล้ว");
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>{noodle.name}</h1>
      <img src={noodle.image} style={{ width: "100%", borderRadius: 10 }} />

      <h3>ขนาด</h3>
      <select value={size} onChange={e => setSize(e.target.value)}>
        <option>ปกติ</option>
        <option>พิเศษ</option>
      </select>

      <h3>ความเผ็ด</h3>
      <select value={spicy} onChange={e => setSpicy(e.target.value)}>
        <option value="">เลือก</option>
        <option>ไม่เผ็ด</option>
        <option>เผ็ดน้อย</option>
        <option>เผ็ดกลาง</option>
        <option>เผ็ดมาก</option>
      </select>

      <h3>น้ำซุป</h3>
      <select value={soup} onChange={e => setSoup(e.target.value)}>
        <option value="">เลือก</option>
        <option>น้ำใส</option>
        <option>ต้มยำ</option>
        <option>น้ำตก</option>
      </select>

      <h3>เส้น</h3>
      <select value={noodleType} onChange={e => setNoodleType(e.target.value)}>
        <option value="">เลือก</option>
        <option>เส้นเล็ก</option>
        <option>เส้นใหญ่</option>
        <option>บะหมี่</option>
      </select>

      <h3>ผัก</h3>
      <select value={vegetable} onChange={e => setVegetable(e.target.value)}>
        <option value="">เลือก</option>
        <option>ใส่ผัก</option>
        <option>ไม่ใส่ผัก</option>
      </select>

      <h3>ท็อปปิ้ง (+10)</h3>
      {["ลูกชิ้น", "ไข่"].map(t => (
        <label key={t} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={toppings.includes(t)}
            onChange={() => toggleTopping(t)}
          />{" "}
          {t}
        </label>
      ))}

      <h2>ราคารวม: {totalPrice} บาท</h2>

      <button onClick={add} style={{ width: "100%", marginTop: 10 }}>
        เพิ่มลงตะกร้า
      </button>

      <Link to="/cart"><button>ไปที่ตะกร้า</button></Link>
      <Link to="/noodles"><button>กลับ</button></Link>
    </div>
  );
}
