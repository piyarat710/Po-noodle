import {useEffect,useState} from "react";
import {supabase} from "./supabase";
import { Link } from "react-router-dom";
import CardButton from "./CardButton";

export default function Noodles(){

const [menus,setMenus]=useState([]);

const loadMenus=async()=>{

const {data,error}=

await supabase
.from("menu_items")
.select("*")
.eq("active",true)
.eq("category","noodle")
.order("id");

if(error){

console.error(error);
return;

}

setMenus(data ?? []);

};


// realtime
useEffect(()=>{

loadMenus();

const ch=

supabase
.channel("noodle-live")

.on(

"postgres_changes",

{

event:"*",
schema:"public",
table:"menu_items"

},

loadMenus

)

.subscribe();

return()=>{

supabase.removeChannel(ch);

};

},[]);


return(

<div style={{padding:"20px"}}>

<h1 style={{textAlign:"center"}}>

🍜 เมนูก๋วยเตี๋ยว

</h1>

<div

style={{

display:"grid",
gridTemplateColumns:"repeat(2,1fr)",
gap:"20px",
marginTop:"30px"

}}

>

{menus.map(item=>(

<Link

key={item.slug}

to={`/noodles/${item.slug}`}

style={{

textDecoration:"none",
color:"black"

}}

>

<div

style={{

border:"1px solid #ccc",
borderRadius:"12px",
padding:"10px",
background:"#eddfdf"

}}

>

<img

src={item.image_url || item.image || "/noodle01.jpeg"}

style={{

width:"100%",
height:"300px",
objectFit:"cover",
borderRadius:"10px"

}}

 />

<h3

style={{

textAlign:"center",
marginTop:"20px"

}}

>

{item.name}

</h3>

<p

style={{

textAlign:"center",
marginTop:"10px"

}}

>

ราคา {item.price} บาท

</p>

</div>

</Link>

))}

</div>

<CardButton

to="/menu"
title="⬅ กลับไปหน้าเมนู"
subtitle="เลือกหมวดอาหารอื่น"

/>

</div>

);

}