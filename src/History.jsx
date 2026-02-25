import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";

export default function History() {

const [history,setHistory]=useState([]);

useEffect(()=>{

const loadHistory=async()=>{

const {data,error}=await supabase
.from("orders")
.select("*")
.eq("status","completed") // เฉพาะที่จบแล้ว
.order("created_at",{ascending:false});

if(error){

console.error(error);

return;

}

setHistory(data||[]);

};

loadHistory();


// ⭐ realtime auto update
const ch=supabase
.channel("orders-live")

.on(
"postgres_changes",
{
event:"*",
schema:"public",
table:"orders"
},
loadHistory
)

.subscribe();


return()=>{

supabase.removeChannel(ch);

};

},[]);



// ⭐ กัน items null
const orderTotal=(items)=>

(items||[])

.reduce(

(sum,item)=>

sum+(Number(item.price)||0),

0

);



return(

<div

style={{

padding:20,
minHeight:"100vh",
background:"#f2f2f2"

}}

>

<h1>

📜 ประวัติการขาย

</h1>



{history.length===0?

(

<p>

ยังไม่มีประวัติการขาย

</p>

)

:

(

history.map(order=>(

<div

key={order.id}

style={{

background:"white",
padding:20,
borderRadius:12,
marginBottom:20

}}

>

<h2>

🪑 โต๊ะ

{order.table_number}

</h2>


<p>

🕒

{

order.created_at

?

new Date(

order.created_at

).toLocaleString()

:

"-"

}

</p>


{(order.items||[])

.map((item,i)=>(

<div key={i}>

<p>

•

{item.name}

</p>

<strong>

{item.price}

บาท

</strong>

<hr/>

</div>

))}


<h3>

💰 รวม

{

(order.total_price??

orderTotal(order.items))

.toLocaleString()

}

บาท

</h3>

</div>

))

)}



<Link to="/kitchen">

<button

style={{

marginTop:20,
padding:12,
background:"#4caf50",
color:"white",
border:"none",
borderRadius:8

}}

>

⬅ กลับหน้าครัว

</button>

</Link>

</div>

);

}