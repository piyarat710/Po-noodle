import { useCart } from "./CartContext";
import { supabase } from "./supabase";
import { useState } from "react";

export default function Checkout() {
  const { currentOrder} = useCart();
  const [file, setFile] = useState(null);

  if (!currentOrder) {
    return <h2>ไม่มีรายการที่ต้องชำระ</h2>;
  }

      const total =
        currentOrder.items?.reduce(
          (sum, i) => sum + i.price,
          0
        ) || 0;

  const qrUrl = `https://promptpay.io/0961408341/${total}`;


const payOrder = async () => {

if (!file){
alert("กรุณาแนบสลิป");
return;
}


// ⭐ อย่าใส่ slips/
const fileName =
`${Date.now()}-${file.name}`;


// upload
const {error:uploadError}
= await supabase.storage
.from("slips")
.upload(
fileName,
file,
{
contentType:file.type,
upsert:false
}

);


if(uploadError){
console.log(uploadError);
alert(uploadError.message);
return;
}


// public url
const {data}

= supabase.storage
.from("slips")
.getPublicUrl(fileName);



// update order
const {error}
= await supabase
.from("orders")
.update({
status:"waiting_verify",
slip_url:data.publicUrl
})
.eq("id",currentOrder.id);


if(error){
console.log(error);
alert(error.message);
return;

}



localStorage.removeItem("currentOrder");

alert("ส่งสลิปแล้ว");

window.location.href="/menu";

};






  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>ชำระเงิน</h1>
      <h2>โต๊ะ {currentOrder.table_number}</h2>

      {currentOrder.items.map((i, idx) => (
        <p key={idx}>{i.name} - {i.price} บาท</p>
      ))}

      <h2>รวม {total} บาท</h2>

      <img src="/bankqr.jpeg" style={{ width: 250 }} />
                    <br />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFile(e.target.files[0])
                      }
                    />

      <button onClick={payOrder}>
        ฉันโอนเงินแล้ว
      </button>
    </div>
  );
}
