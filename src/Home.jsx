import { Link } from "react-router-dom";
import CardButton from "./CardButton";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ยินดีต้อนรับสู่ Food App</h1>
      <p>นี่คือหน้าแรกของเว็บ</p>

  <CardButton
  to="/menu"
  title="ไปหน้าเมนู"
  subtitle="เลือกเมนูอาหาร"
  />
    <CardButton
  to="/Kitchen"
  title="ไปหน้าเมนูที่เลือก"
  subtitle="เลือกเมนูอาหาร"
  />
      
    </div>
  );
}
