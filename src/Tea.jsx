import TeaMenu from "./data/Tea";
import { Link } from "react-router-dom";
import CardButton from "./CardButton";

export default function Tea() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>เมนูเครื่องดื่ม</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "30px"
        }}
      >
        {TeaMenu.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "10px"
            }}
          >
            <div
              style={{
                width: "100%",
                height: "350px",
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
                  objectFit: "cover"
                }}
              />
            </div>

            <h3 style={{ textAlign: "center", marginTop: "10px" }}>
              {item.name}
            </h3>

            <p style={{ textAlign: "center" }}>
              ราคา {item.price} บาท
            </p>
          </div>
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
