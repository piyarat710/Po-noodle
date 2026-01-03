import { useCart } from "./CartContext";

export default function Checkout() {
  const { currentOrder, payOrder } = useCart();

  if (!currentOrder) {
    return <h2>ไม่มีรายการที่ต้องชำระ</h2>;
  }

  const total = currentOrder.items.reduce(
    (sum, i) => sum + i.price,
    0
  );

  const qrUrl = `https://promptpay.io/0812345678/${total}`;

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>ชำระเงิน</h1>
      <h2>โต๊ะ {currentOrder.table}</h2>

      {currentOrder.items.map((i, idx) => (
        <p key={idx}>{i.name} - {i.price} บาท</p>
      ))}

      <h2>รวม {total} บาท</h2>

      <img src={qrUrl} style={{ width: 250 }} />

      <button onClick={payOrder}>
        ยืนยันว่าชำระเงินแล้ว
      </button>
    </div>
  );
}
