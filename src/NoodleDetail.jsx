import { useParams, Link } from "react-router-dom";
import { useState , useEffect } from "react";
import { useCart } from "./CartContext";
import { supabase } from "./supabase";

export default function NoodleDetail() {

const { slug } = useParams();
const { addToCart } = useCart();
const [noodle,setNoodle]=useState(null);
const [size,setSize]=useState("ปกติ");
const [spicy,setSpicy]=useState("");
const [soup,setSoup]=useState("");
const [noodleType,setNoodleType]=useState("");
const [vegetable,setVegetable]=useState("");
const [toppings,setToppings]=useState([]);
const [error,setError]=useState("");


// โหลดจาก DB
useEffect(()=>{

const load = async()=>{
const {data,error}=
await supabase
.from("menu_items")
.select("*")
.eq("category","noodle")
.eq("active",true)
.eq("slug",slug)
.single();

if(error){

console.log(error);

return;

}

setNoodle(data);

};

load();

},[slug]);


if(!noodle)

return <h2>ไม่พบเมนูนี้</h2>;


// ===== logic เดิมคุณ =====

const totalPrice =

noodle.price +

(size==="พิเศษ"?10:0)+

toppings.length*10;


const toggleTopping=(t)=>{

setToppings(prev=>

prev.includes(t)

?prev.filter(x=>x!==t)

:[...prev,t]

);

};


const add=()=>{

if(!spicy||!soup||!noodleType||!vegetable){

setError("⚠️ กรุณาเลือกข้อมูลให้ครบ");

return;

}

setError("");

addToCart({

type:"noodle",

name:noodle.name,

size,

spicy,

soup,

noodleType,

vegetable,

toppings,

price:totalPrice

});

alert("เพิ่มลงตะกร้าแล้ว");

};


return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>{noodle.name}</h1>
      <img src={noodle.image_url} style={{ width: "100%", borderRadius: 10 }} />

        <div className="option-group">
          <h3>ขนาด</h3>
          <select value={size} onChange={e => setSize(e.target.value)}>
            <option>ปกติ</option>
            <option>พิเศษ</option>
          </select>
        </div>

        <div className="option-group">
          <h3>ความเผ็ด</h3>
          <select value={spicy} onChange={e => setSpicy(e.target.value)}>
            <option value="">เลือก</option>
            <option>ไม่เผ็ด</option>
            <option>เผ็ดน้อย</option>
            <option>เผ็ดกลาง</option>
            <option>เผ็ดมาก</option>
          </select>
        </div>

          <div className="option-group">
              <h3>น้ำซุป</h3>
              <select value={soup} onChange={e => setSoup(e.target.value)}>
                <option value="">เลือก</option>
                <option>น้ำใส</option>
                <option>ต้มยำ</option>
                <option>น้ำตก</option>
                <option>น้ำเย็นตาโฟ</option>
              </select>
              </div>

        <div className="option-group">
              <h3>เส้น</h3>
              <select value={noodleType} onChange={e => setNoodleType(e.target.value)}>
                <option value="">เลือก</option>
                <option>เส้นเล็ก</option>
                <option>เส้นใหญ่</option>
                <option>เส้นมาม่า</option>
                <option>เส้นบะหมี่</option>
                <option>หมี่หยก</option>
                <option>วุ้นเส้น</option>
              </select>
        </div>

        <div className="option-group">
              <h3>ผัก</h3>
              <select value={vegetable} onChange={e => setVegetable(e.target.value)}>
                <option value="">เลือก</option>
                <option>ผักมาก</option>
                <option>ผักกลาง</option>
                <option>ผักน้อย</option>
                <option>ไม่ผัก</option>

              </select>
        </div>

<div className="option-group jp">
  <h3>ท็อปปิ้ง (+10)</h3>
  <div className="jp-topping-grid">
    {["เพิ่มลูกชิ้น", "เพิ่มไข่ยางมะตูม", "เพิ่มหมู"].map(t => (
      <div
        key={t}
        className={`jp-topping-card ${toppings.includes(t) ? "active" : ""}`}
        onClick={() => toggleTopping(t)}
      >
        <span className="jp-name">{t}</span>
        <span className="jp-price">+10</span>
      </div>
    ))}
  </div>
</div>

      <h2>ราคารวม: {totalPrice} บาท</h2>
      {error && (
    <p style={{ color: "red", marginTop: 10 }}>
    {error}
    </p>
    )}

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
  <button
    style={{
      width: "100%",
      marginTop: "10px",
      background: "#49be84ff",
      padding: "12px",
      fontSize: "16px",
      color: "white",
      border: "none",
      borderRadius: "8px"
    }}
  >
   🧺 ไปที่ตะกร้า
  </button>
</Link>

<Link to="/noodles">
  <button
    style={{
      width: "100%",
      marginTop: "10px",
      padding: "12px",
      fontSize: "16px",
      color: "white",
      border: "none",
      borderRadius: "8px",
      background: "#999"
    }}
  >
    กลับไปหน้าเมนูก๋วยเตี๋ยว
  </button>
</Link>

    </div>
  );


}