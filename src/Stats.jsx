import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Stats() {
  const [history, setHistory] = useState([]);

  // 🔄 โหลดข้อมูลแบบ real-time (ทุก 3 วิ)
  useEffect(() => {
    const loadHistory = () => {
      const data =
        JSON.parse(localStorage.getItem("orderHistory")) || [];
      setHistory(data);
    };

    loadHistory(); // โหลดทันที
    const interval = setInterval(loadHistory, 3000);

    return () => clearInterval(interval);
  }, []);

  // ===== ยอดขายรวม =====
  const totalSales = history.reduce(
    (sum, order) =>
      sum +
      order.items.reduce((s, item) => s + item.price, 0),
    0
  );

  // ===== เมนูขายดี =====
  const menuCount = {};

  history.forEach(order => {
    order.items.forEach(item => {
      menuCount[item.name] =
        (menuCount[item.name] || 0) + 1;
    });
  });

  const sortedMenus = Object.entries(menuCount)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>📊 สถิติร้าน</h1>

      {/* ยอดขาย */}
      <div style={{ marginTop: 20 }}>
        <h2>💰 ยอดขายรวม</h2>
        <p style={{ fontSize: 22 }}>
          {totalSales.toLocaleString()} บาท
        </p>
      </div>

      {/* เมนูขายดี */}
      <div style={{ marginTop: 30 }}>
        <h2>🔥 เมนูขายดี</h2>

        {sortedMenus.length === 0 ? (
          <p>ยังไม่มีข้อมูล</p>
        ) : (
          <ol>
            {sortedMenus.map(([name, count]) => (
              <li key={name}>
                {name} x{count}
              </li>
            ))}
          </ol>
        )}
      </div>

      <Link to="/">
        <button style={{ marginTop: 30 }}>
          ⬅ กลับหน้าแรก
        </button>
      </Link>
    </div>
  );
}
