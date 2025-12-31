import { useParams, Link } from "react-router-dom";
import NoodleMenu from "./data/Noodles";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function NoodleDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const noodle = NoodleMenu.find(n => n.id === id);

  if (!noodle) return <h2>ไม่พบเมนู</h2>;

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
    <div style={{ padding: "20px" }}>
      <h1>{noodle.name}</h1>
      <img src={noodle.image} style={{ width: "100%" }} />

      <button onClick={add}>เพิ่มลงตะกร้า</button>

      <Link to="/cart">
        <button>ไปที่ตะกร้า</button>
      </Link>

      <Link to="/noodles">
        <button>กลับ</button>
      </Link>
    </div>
  );
}
