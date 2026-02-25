import { useEffect, useState } from "react";
import CardButton from "./CardButton";
import { isToday } from "./Logic";
import { supabase } from "./supabase";

export default function Kitchen() {

const [orders,setOrders]=useState([]);

const role = localStorage.getItem("role"); // ⭐ เพิ่มแค่นี้


// logout
const logout=()=>{

localStorage.removeItem("isStaff");
localStorage.removeItem("role");

window.location.href="/login";

};



useEffect(()=>{

const loadOrders = async () => {

const { data } = await supabase
.from("orders")
.select("*")
.order("created_at",{ascending:false});

if(!data){

setOrders([]);

return;

}

// ⭐ Kitchen ใช้เฉพาะยังไม่ completed
setOrders(

data.filter(order =>
order.status !== "completed"
)

);

};

loadOrders();


// realtime
const channel =
supabase
.channel("orders")

.on(

"postgres_changes",

{
event:"*",
schema:"public",
table:"orders"

},

payload=>{

console.log("Realtime :",payload);

loadOrders();

}

)

.subscribe();

return()=>{

supabase.removeChannel(channel);

};

},[]);




const todayOrders=
orders.filter(order=>
isToday(order.created_at)
);



const todayTotal=
todayOrders.reduce(

(sum,order)=>

sum+
(order.items||[])
.reduce(

(s,i)=>s+(i.price||0)

,0)

,0);




const doneOrder=async(id)=>{

await supabase
.from("orders")
.update({
status:"completed",
paid_at:new Date()
})
.eq("id",id);
};


const confirmPaid=async(id)=>{

await supabase
.from("orders")
.update({

status:"paid"

})
.eq("id",id);

};



return(

<div
style={{
padding:"20px",
minHeight:"100vh",
background:"#f2f2f2"
}}
>

<h1>หน้าครัว</h1>


{/* 📅 ยอดวันนี้ */}
<div
style={{
background:"white",
padding:20,
borderRadius:12,
marginBottom:20,
fontSize:18
}}
>

<h2>📅 ยอดขายวันนี้</h2>

<p>{todayTotal.toLocaleString()} บาท</p>

<p>{todayOrders.length} ออเดอร์</p>

</div>



{/* ⭐ ADMIN ไม่เห็น logout */}
{role === "staff" && (

<button
onClick={logout}
style={{
marginBottom:20,
padding:10,
background:"#f44336",
color:"white",
border:"none",
borderRadius:6
}}
>

ออกจากระบบ

</button>

)}



<CardButton
to="/history"
title="ประวัติการขาย"
subtitle="ดูออเดอร์ย้อนหลัง"
/>



<CardButton
to="/menu"
title="ไปหน้าเมนู"
subtitle="กลับไปดูฝั่งลูกค้า"
/>



{orders.length===0?

<h2 style={{marginTop:"20px"}}>

ยังไม่มีออเดอร์

</h2>

:

orders.map(order=>(

<div
key={order.id}
style={{
background:"white",
padding:"20px",
borderRadius:"12px",
marginBottom:"20px",
fontSize:"18px"
}}
>

<h2>🪑 โต๊ะ {order.table_number}</h2>

<div
style={{
marginBottom:10,
fontWeight:"bold",
color:
order.status==="pending"
?"#ff9800"
:order.status==="waiting_verify"
?"#ffc107"
:"#4caf50"
}}
>

{order.status==="pending"
?"🟠 รอชำระเงิน"
:order.status==="waiting_verify"
?"🟡 รอตรวจสอบสลิป"
:"🟢 ชำระแล้ว"}

</div>

<p>

เวลา:

{order.created_at
?new Date(order.created_at)
.toLocaleTimeString()
:"-"}

</p>



{order.items?.map((item,i)=>{

const details=[

item.size&&`ขนาด: ${item.size}`,
item.spicy&&`เผ็ด: ${item.spicy}`,
item.soup&&`น้ำซุป: ${item.soup}`,
item.noodleType&&`เส้น: ${item.noodleType}`,
item.vegetable&&`ผัก: ${item.vegetable}`,
item.toppings?.length&&
`ท็อปปิ้ง: ${item.toppings.join(", ")}`,
item.sweetness&&`หวาน: ${item.sweetness}`

].filter(Boolean);

return(

<div
key={i}
style={{
padding:12,
borderRadius:10,
background:"#fafafa",
marginBottom:12
}}
>

<div style={{fontWeight:"bold",fontSize:20}}>

• {item.name}

</div>

{details.length>0&&(

<div style={{marginTop:6}}>

{details.map((d,idx)=>(

<span
key={idx}
style={{
display:"inline-block",
padding:"4px 8px",
margin:"4px 6px 0 0",
fontSize:20,
background:"#e0f2f1",
borderRadius:6
}}
>

{d}

</span>

))}

</div>

)}

<div style={{marginTop:18,fontWeight:"bold"}}>

{item.price} บาท

</div>

</div>

);

})}



{order.status==="pending"&&(

<button
onClick={()=>confirmPaid(order.id)}
style={{
marginTop:10,
padding:15,
width:"100%",
background:"#f1d4a7",
color:"white",
border:"none",
borderRadius:10,
fontSize:18
}}
>

⏳ รอลูกค้าจ่ายเงิน

</button>

)}



{order.status==="waiting_verify"&&(

<div>

{order.slip_url&&(

<img
src={order.slip_url}
alt="slip"
style={{
width:"100%",
maxWidth:500,
borderRadius:10,
marginTop:10,
marginBottom:10
}}
/>

)}

<button
onClick={()=>confirmPaid(order.id)}
style={{
marginTop:10,
padding:15,
width:"100%",
background:"#ffc107",
color:"black",
border:"none",
borderRadius:10,
fontSize:18
}}
>

✅ ยืนยันรับเงินแล้ว

</button>

</div>

)}



{order.status==="paid"&&(

<button
onClick={()=>doneOrder(order.id)}
style={{
marginTop:15,
padding:15,
width:"100%",
background:"#4caf50",
color:"white",
border:"none",
borderRadius:10,
fontSize:20
}}
>

✅ เสร็จแล้ว

</button>

)}

</div>

))

}

</div>

);

}