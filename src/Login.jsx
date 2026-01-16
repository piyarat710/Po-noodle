import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ เพิ่ม Link

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const STAFF_USER = "staff";
    const STAFF_PASS = "1234";

    if (username === STAFF_USER && password === STAFF_PASS) {
      localStorage.setItem("isStaff", "true");
      alert("เข้าสู่ระบบสำเร็จ");
      navigate("/kitchen");
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          🔐 เข้าสู่ระบบพนักงาน
        </h2>

        <input
          type="text"
          placeholder="ชื่อผู้ใช้ (staff)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="รหัสผ่าน (1234)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          เข้าสู่ระบบ
        </button>

        <Link to="/">
          <button
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              background: "#d6de3c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            กลับหน้าแรก
          </button>
        </Link>
      </div>
    </div>
  );
}
