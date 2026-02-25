import { useParams, Link } from "react-router-dom";
import { useState , useEffect } from "react";
import { useCart } from "./CartContext";
import { supabase } from "./supabase";

export default function TeaDetail() {

const { slug } = useParams();

const { addToCart } = useCart();

const [tea,setTea]=useState(null);

const [sweetness,setSweetness]=useState(50);

const [toppings,setToppings]=useState([]);




// ⭐ โหลดจาก Supabase
useEffect(()=>{

const loadTea = async()=>{

const {data,error}=await supabase

.from("menu_items")

.select("*")

.eq("slug",slug)

.eq("category","tea")

.single();

if(error){

console.error(error);

return;

}

setTea(data);

};

loadTea();

},[slug]);



if(!tea){

return <h2>ไม่พบเมนูชานี้</h2>;

}



// topping toggle
const toggle=(name)=>{

setToppings(prev=>

prev.includes(name)

? prev.filter(t=>t!==name)

:[...prev,name]

);

};



const toppingPrice=

(toppings.includes("ไข่มุก")?5:0)+

(toppings.includes("วิป")?10:0);



const totalPrice=

(Number(tea.price)||0)+toppingPrice;



const add=()=>{

addToCart({

type:"tea",

name:tea.name,

sweetness:`${sweetness}%`,

toppings,

price:totalPrice

});

alert("เพิ่มลงตะกร้าแล้ว");

};



return(

<div

style={{

padding:"20px",

maxWidth:"600px",

margin:"0 auto"

}}

>

<h1>

{tea.name}

</h1>


<img

src={tea.image_url||"/tea01.jpg"}

alt={tea.name}

style={{

width:"100%",

borderRadius:"10px"

}}

/>



<div

style={{

marginTop:"20px",

padding:"15px",

background:"#fff8f2",

borderRadius:"12px",

boxShadow:

"0 4px 10px rgba(0,0,0,0.05)"

}}

>

<h3>

ระดับความหวาน :

<span

style={{color:"#6f4e37"}}

>

{sweetness}%

</span>

</h3>


<input

type="range"

min="0"

max="125"

step="25"

value={sweetness}

onChange={e=>

setSweetness(

Number(e.target.value)

)

}

className="sweet-slider"

/>


<div

style={{

marginTop:"8px",

fontSize:"14px",

color:"#6f4e37"

}}

>

{sweetness===0&&"ไม่หวาน 🚫"}

{sweetness===25&&"หวานน้อย 🙂"}

{sweetness===50&&"หวานปกติ 😋"}

{sweetness===75&&"หวานมาก 🤤"}

{sweetness===100&&"หวานสุดๆ 🧁"}

{sweetness===125&&"หวานตัดขา 🌋"}

</div>

</div>



<div className="option-group cafe-soft">

<h3>

ท็อปปิ้ง

</h3>


<div className="soft-grid">

{["ไข่มุก","วิป"]

.map(t=>(

<div

key={t}

className={

`soft-card

${

toppings.includes(t)

?

"active"

:

""

}`

}

onClick={()=>toggle(t)}

>

<div className="emoji">

{t==="ไข่มุก"?"🧋":"🍦"}

</div>

<div>

{t}

</div>

<small>

+

{t==="ไข่มุก"?5:10}

บาท

</small>

</div>

))}

</div>

</div>



<div className="price-box">

รวม

{totalPrice}

บาท

</div>



<button

onClick={add}

style={{

marginTop:"20px",

width:"100%",

padding:"15px",

fontSize:"18px",

background:"#4caf50",

color:"white",

border:"none",

borderRadius:"8px"

}}

>

เพิ่มลงตะกร้า

</button>



<Link to="/cart">

<button

style={{

width:"100%",

marginTop:"10px",

background:"#49be84ff"

}}

>

🧺 ไปที่ตะกร้า

</button>

</Link>



<Link to="/tea">

<button

style={{

width:"100%",

marginTop:"10px",

background:"#999"

}}

>

กลับไปหน้าเครื่องดื่ม

</button>

</Link>

</div>

);

}