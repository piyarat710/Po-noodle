import { Link } from "react-router-dom";
import CardButton from "./CardButton";

const menu = [
  { id: 1, name: "ก๋วยเตี๋ยว", image: "/noodle01.jpeg", path: "/Noodles" },
  { id: 2, name: "ชา", image: "/tea01.jpg", path: "/tea" }
];

export default function Menu() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>เมนูอาหารทั้งหมด</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >
        {menu.map(item => (
          <Link
            to={item.path}
            key={item.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                width: "200px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                cursor: "pointer"
              }}
            >
              <img
                src={item.image}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h3>{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/cart">
  <button style={{ marginTop: "36px" ,
          padding: "20px",
          width: "50%",
          background: "#49be84ff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
  }}>
    ดูตะกร้า
  </button>
</Link>
        <CardButton
        to="/"
        title="กลับไปหน้าแรก"
        subtitle="กลับไปหน้าแรก"
        />
    </div>
  );
}
