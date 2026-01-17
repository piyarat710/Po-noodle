import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("orderHistory")) || [];
    setHistory(data.reverse()); // ใหม่อยู่บน
  }, []);

  const orderTotal = (items) =>
    items.reduce((s, i) => s + i.price, 0);

  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        background: "#f2f2f2"
      }}
    >
      <h1>📜 ประวัติการขาย</h1>

      {history.length === 0 ? (
        <p>ยังไม่มีประวัติการขาย</p>
      ) : (
        history.map((order, idx) => (
          <div
            key={idx}
            style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              marginBottom: 20
            }}
          >
            <h2>🪑 โต๊ะ {order.table}</h2>

            <p>
              🕒{" "}
              {order.finishedAt
                ? new Date(order.finishedAt).toLocaleString()
                : "-"}
            </p>

            {order.items.map((item, i) => (
              <div key={i}>
                <p>• {item.name}</p>
                <strong>{item.price} บาท</strong>
                <hr />
              </div>
            ))}

            <h3>
              💰 รวม {orderTotal(order.items).toLocaleString()} บาท
            </h3>
          </div>
        ))
      )}

      <Link to="/kitchen">
        <button
          style={{
            marginTop: 20,
            padding: 12,
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: 8
          }}
        >
          ⬅ กลับหน้าครัว
        </button>
      </Link>
    </div>
  );
}
