import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function AdminStats(){

const [today,setToday]=useState(null);
const [month,setMonth]=useState(null);

const [selectedDate,setSelectedDate]=useState("");
const [selectedData,setSelectedData]=useState(null);

const [yearData,setYearData]=useState([]);

const navigate=useNavigate();


// ===== helper =====

function calc(data){

let total=0;

const menu={};

(data||[]).forEach(o=>{

total+=o.total_price||0;

(o.items||[]).forEach(i=>{

menu[i.name]=(menu[i.name]||0)+1;

});

});

return {total,menu};

}


// ===== TODAY =====

async function loadToday(){

const start=dayjs().startOf("day").toISOString();

const end=dayjs().endOf("day").toISOString();

const {data}=await supabase

.from("orders")

.select("*")

.eq("status","completed")

.gte("created_at",start)

.lte("created_at",end);

setToday(calc(data));

}


// ===== MONTH =====

async function loadMonth(){

const start=dayjs().startOf("month").toISOString();

const end=dayjs().endOf("month").toISOString();

const {data}=await supabase

.from("orders")

.select("*")

.eq("status","completed")

.gte("created_at",start)

.lte("created_at",end);

setMonth(calc(data));

}


// ===== SELECT DAY =====

async function loadSelected(date){

if(!date)return;

const start=dayjs(date).startOf("day").toISOString();

const end=dayjs(date).endOf("day").toISOString();

const {data}=await supabase

.from("orders")

.select("*")

.eq("status","completed")

.gte("created_at",start)

.lte("created_at",end);

setSelectedData(calc(data));

}


// ===== YEAR =====

async function loadYear(){

const start=dayjs()

.subtract(1,"year")

.startOf("month")

.toISOString();

const {data}=await supabase

.from("orders")

.select("total_price,created_at")

.eq("status","completed")

.gte("created_at",start);

const month={};

(data||[]).forEach(o=>{

const m=dayjs(o.created_at).format("MMM");

month[m]=(month[m]||0)+(o.total_price||0);

});

setYearData(

Object.entries(month)

.map(([month,total])=>({

month,

total

}))

);

}



// ⭐ realtime auto refresh

useEffect(()=>{

loadToday();

loadMonth();

loadYear();

const channel=supabase

.channel("admin-stats")

.on(

"postgres_changes",

{

event:"*",

schema:"public",

table:"orders"

},

()=>{

loadToday();

loadMonth();

loadYear();

}

)

.subscribe();

return()=>{

supabase.removeChannel(channel);

};

},[]);



return(

<div style={{padding:20}}>

<button

onClick={()=>navigate("/admin")}

style={{

width:"100%",

padding:"20px",

marginBottom:"20px",

background:"#8a7f7f",

cursor:"pointer"

}}

>

กลับหน้า ADMIN

</button>



<h1>Admin Stats</h1>


<h2>วันนี้</h2>

<p>วันนี้ขาย :{today?.total||0} บาท</p>

{

today&&

Object.entries(today.menu)

.map(([name,qty])=>(

<div key={name}>

{name} {qty}

</div>

))

}



<h2>เดือนนี้</h2>

<p>{month?.total||0} บาท</p>

{

month&&

Object.entries(month.menu)

.sort((a,b)=>b[1]-a[1])

.slice(0,5)

.map(([name,qty])=>(

<div key={name}>

{name} {qty}

</div>

))

}



<h2>เลือกวันย้อนหลัง</h2>

<input

type="date"

value={selectedDate}

onChange={e=>{

setSelectedDate(e.target.value);

loadSelected(e.target.value);

}}

/>



{

selectedData&&(

<div>

<p>วันนั้นขาย :{selectedData.total}บาท</p>

{

Object.entries(selectedData.menu)

.map(([name,qty])=>(

<div key={name}>

{name} {qty}

</div>

))

}

</div>

)}



<h2>ย้อนหลัง 1 ปี</h2>

{

yearData.map(d=>(

<div key={d.month}>

{d.month} {d.total}

</div>

))

}

</div>

);

}