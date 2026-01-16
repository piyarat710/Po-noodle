import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    // 🔐 กำหนดรหัสพนักงานตรงนี้
    if (username === "staff" && password === "1234") {
      localStorage.setItem("staffLogin", "true");
      navigate("/kitchen");
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: "auto" }}>
      <h2>🔐 เข้าสู่ระบบพนักงาน</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <button
        onClick={login}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 12,
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: 6
        }}
      >
        เข้าสู่ระบบ
      </button>
    </div>
  );
}
