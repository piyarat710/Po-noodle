import Noodles from "./data/tea";
import { Link } from "react-router-dom";
import CardButton from "./cardButton";


export default function Tea() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>เมนูก๋วยเตี๋ยว</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "30px"
        }}
      >
        {Noodles.map((item) => (
          <Link
            to={`/Noodles/${item.id}`}
            key={item.id}
            style={{
              textDecoration: "none",
              color: "black"
            }}
          >
            {/* การ์ด */}
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "10px",
                transition: "0.2s",
                cursor: "pointer"
              }}
            >
              {/* กล่องรูป (คุมขนาดตรงนี้) */}
              <div
                style={{
                  width: "100%",
                  height: "450px",      // ⭐ ความสูงเท่ากันทุกใบ
                  overflow: "hidden",
                  borderRadius: "10px"
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // ⭐ ตัดรูปให้พอดีกรอบ
                    display: "block"
                  }}
                />
              </div>

              <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                {item.name}
              </h3>
              
            </div>
          </Link>
        ))}
      </div>
  <CardButton
  to="/menu"
  title="⬅ กลับไปหน้าเมนู"
  subtitle="เลือกหมวดอาหารอื่น"
  />
    </div>
  );
}
