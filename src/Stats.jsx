import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Stats() {

const [history,setHistory]=useState([]);

useEffect(()=>{

const loadHistory=async()=>{

const {data,error}=await supabase
.from("orders")
.select("*")
.eq("status","completed")
.order("created_at",{ascending:false});

if(!error){

setHistory(data||[]);

}

};

loadHistory();

const interval=setInterval(loadHistory,3000);

return()=>clearInterval(interval);

},[]);



const now=new Date();

const thisMonth=
`${now.getFullYear()}-${now.getMonth()+1}`;


// เดือนนี้
const monthlyHistory=history.filter(order=>{

const d=new Date(order.created_at);

return(

d.getFullYear()===now.getFullYear()

&&

d.getMonth()===now.getMonth()

);

});



// ===== ยอดขายรวม =====

const totalSales=monthlyHistory.reduce(

(sum,order)=>sum+(order.total_price||0),

0

);


// ===== รวม items =====

const allItems=monthlyHistory.flatMap(

order=>order.items||[]

);


// แยกประเภท

const drinks=allItems.filter(

item=>item.type==="tea"

);

const noodles=allItems.filter(

item=>item.type==="noodle"

);


// ===== นับเมนู =====

const countMenu=(list)=>{

const obj={};

list.forEach(item=>{

obj[item.name]=(obj[item.name]||0)+1;

});

return Object.entries(obj)

.sort((a,b)=>b[1]-a[1]);

};


const sortedNoodleMenus=countMenu(noodles);

const sortedDrinkMenus=countMenu(drinks);



return(

<div style={{padding:20,maxWidth:600,margin:"0 auto"}}>

<h1>📊 สถิติร้าน</h1>

<div style={{marginTop:30}}>

<h2></h2>

<p>

🍜 ก๋วยเตี๋ยว :

{noodles.length}

ชาม

</p>

<hr/>

<p>

🧋 ชา / เครื่องดื่ม :

{drinks.length}

แก้ว

</p>

</div>


<div style={{marginTop:30}}>

<h2>

🍜 เมนูขายดีของก๋วยเตี๋ยว

</h2>

{sortedNoodleMenus.length===0?

<p>ยังไม่มีข้อมูล</p>

:(

<ol>

{sortedNoodleMenus.map(

([name,count])=>(

<li key={name}>

{name} x{count}

</li>

)

)}

</ol>

)}

</div>



<div style={{marginTop:30}}>

<h2>

🧋 เมนูขายดีของชา

</h2>

{sortedDrinkMenus.length===0?

<p>ยังไม่มีข้อมูล</p>

:(

<ol>

{sortedDrinkMenus.map(

([name,count])=>(

<li key={name}>

{name} x{count}

</li>

)

)}

</ol>

)}

</div>


<Link to="/">

<button style={{marginTop:30}}>

⬅ กลับหน้าแรก

</button>

</Link>

</div>

);

}