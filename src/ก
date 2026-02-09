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

      const allItems = history.flatMap(order => order.items);

      const drinks = allItems.filter(item =>
      item.name.includes("ชา")
      );

      const noodles = allItems.filter(item =>
      !item.name.includes("ชา")
      );

      const noodleTotal = noodles.reduce(
      (s, i) => s + i.price,
      0
      );

      const drinkTotal = drinks.reduce(
      (s, i) => s + i.price,
      0
      );

        const noodleMenuCount = {};
  noodles.forEach(item => {
    noodleMenuCount[item.name] =
      (noodleMenuCount[item.name] || 0) + 1;
  });

  const sortedNoodleMenus = Object.entries(noodleMenuCount)
    .sort((a, b) => b[1] - a[1]);

  // ===== เมนูขายดีของชา =====
  const drinkMenuCount = {};
  drinks.forEach(item => {
    drinkMenuCount[item.name] =
      (drinkMenuCount[item.name] || 0) + 1;
  });

  const sortedDrinkMenus = Object.entries(drinkMenuCount)
    .sort((a, b) => b[1] - a[1]); 
      
  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>📊 สถิติร้าน</h1>

            {/* แยกตามประเภท */}
      <div style={{ marginTop: 30 }}>
        <h2></h2>

        <p>🍜 ก๋วยเตี๋ยว: {noodles.length} ชาม</p>
        

        <hr />

        <p>🧋 ชา / เครื่องดื่ม: {drinks.length} แก้ว</p>
        
      </div>

      {/* เมนูขายดี */}
      <div style={{ marginTop: 30 }}>
        <h2>🍜 เมนูขายดีของก๋วยเตี๋ยว</h2>

        {sortedMenus.length === 0 ? (
          <p>ยังไม่มีข้อมูล</p>
        ) : (
          <ol>
            {sortedNoodleMenus.map(([name, count]) => (
              <li key={name}>
                {name} x{count}
              </li>
            ))}
          </ol>
        )}
      </div>
        
            <div style={{ marginTop: 30 }}>
            <h2>🧋 เมนูขายดีของชา</h2>

            {sortedDrinkMenus.length === 0 ? (
            <p>ยังไม่มีข้อมูล</p>
            ) : (
            <ol>
            {sortedDrinkMenus.map(([name, count]) => (
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
