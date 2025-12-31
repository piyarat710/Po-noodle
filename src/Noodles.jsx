import NoodleMenu from "./data/Noodles";
import { Link } from "react-router-dom";
import CardButton from "./CardButton";

export default function Noodles() {
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
        {NoodleMenu.map((item) => (
          <Link
            to={`/noodles/${item.id}`}
            key={item.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "10px",
                cursor: "pointer"
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />

              <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                {item.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <CardButton
        to="/Menu"
        title="⬅ กลับไปหน้าเมนู"
        subtitle="เลือกหมวดอาหารอื่น"
      />
    </div>
  );
}
