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
  style={{ background: "#ffffff" }}
  />
    <CardButton
  to="/kitchen"
  title="หน้าพนักงาน"
  subtitle="สำหรับพนักงาน"
  style={{ background: "#ffffff" }}
  />

  <CardButton 
  to="/stats"
  title="สถิติร้าน"
  subtitle="สถิติร้าน"
  style={{ background: "#ff0000" }}
  />
      
    </div>
  );
}
