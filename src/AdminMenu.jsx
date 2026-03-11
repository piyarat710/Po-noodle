import {useEffect,useState} from "react";
import {supabase} from "./supabase";
import {useNavigate} from "react-router-dom";

export default function AdminMenu(){

const [menus,setMenus]=useState([]);

const [name,setName]=useState("");
const [price,setPrice]=useState("");
const [category,setCategory]=useState("noodle");
const navigate = useNavigate();


// ⭐ AUTO SLUG
const makeSlug=(text)=>{

return text
.toLowerCase()
.trim()
.replace(/\s+/g,"-")
.replace(/[^\wก-๙-]+/g,"")
.replace(/--+/g,"-");

};


// โหลด menu
const loadMenus=async()=>{

const {data,error}=await supabase
.from("menu_items")
.select("*")
.order("id",{ascending:false});

if(!error){

setMenus(data||[]);

}

};


// ⭐ realtime
useEffect(()=>{

loadMenus();

const ch=supabase
.channel("menu-live")

.on(
"postgres_changes",
{
event:"*",
schema:"public",
table:"menu_items"
},
()=>{
loadMenus();
}
)

.subscribe();

return()=>{

supabase.removeChannel(ch);

};

},[]);



// ⭐ upload image
const uploadImage = async (file) => {

const fileName=Date.now()+"-"+file.name;

const { error } = await supabase.storage
.from("menu-images")
.upload(`public/${fileName}`, file, {
contentType:file.type,
upsert:true
});

if(error){

console.error(error);

alert("upload fail :"+error.message);

return null;

}

const { data:publicData } =
supabase.storage
.from("menu-images")
.getPublicUrl(`public/${fileName}`);

return publicData.publicUrl;

};



// ⭐ เพิ่ม menu (Realtime + Instant)
const addMenu=async(e)=>{
e.preventDefault();
let imageUrl=null;
const file=e.target.image.files[0];
if(file){
imageUrl=await uploadImage(file);
}

const autoSlug=makeSlug(name);


// ⭐ return data กลับมาเลย
const {data,error}=await supabase

.from("menu_items")

.insert({

name,
price:Number(price),
category,
image_url:imageUrl,
active:true,
slug:autoSlug

})

.select()
.single();


if(error){

alert(error.message);

return;

}


// ⭐ เพิ่มเข้า state ทันที (ไม่ต้อง reload)
setMenus(prev=>[data,...prev]);


// reset form
setName("");
setPrice("");

e.target.reset();

};



// เปลี่ยนราคา
const changePrice=async(id,newPrice)=>{

await supabase

.from("menu_items")

.update({

price:Number(newPrice)

})

.eq("id",id);

};



// toggle เปิดปิดขาย
const toggleActive=async(menu)=>{

// ⭐ update หน้าเลยทันที
setMenus(prev=>
prev.map(m=>
m.id===menu.id
? {...m,active:!menu.active}
:m));

await supabase
.from("menu_items")
.update({
active:!menu.active})
.eq("id",menu.id);
};



// delete
const deleteMenu=async(id)=>{

if(!confirm("ลบ?"))return;


// ⭐ ลบจากหน้าเลย
setMenus(prev=>
prev.filter(m=>m.id!==id));
await supabase
.from("menu_items")
.delete()
.eq("id",id);};




return(
    
<div style={{padding:"30px"}}>
            <button
            onClick={()=>navigate("/admin")}
            style={{
            width:"100%",
            padding:"20px",
            marginBottom:"20px",
            background:"#8a7f7f",
            cursor:"pointer"}}>
            กลับหน้า ADMIN
            </button>
            
<h1>ADMIN MENU </h1>
<form onSubmit={addMenu}>

<input
placeholder="ชื่อเมนู"
value={name}
onChange={e=>setName(e.target.value)}
required
/>

<input
placeholder="ราคา"
value={price}
onChange={e=>setPrice(e.target.value)}
required
/>


<select
value={category}
onChange={e=>setCategory(e.target.value)}
>

<option value="noodle">
Noodle
</option>

<option value="tea">
Tea
</option>

</select>


<input
type="file"
name="image"
/>


<button>
เพิ่มเมนู
</button>

</form>


<hr/>


<h2>Noodle</h2>

{menus
.filter(m=>m.category==="noodle")
.map(menu=>(

<MenuCard
key={menu.id}
menu={menu}
changePrice={changePrice}
toggleActive={toggleActive}
deleteMenu={deleteMenu}
/>

))}



<h2>Tea</h2>

{menus
.filter(m=>m.category==="tea")
.map(menu=>(

<MenuCard
key={menu.id}
menu={menu}
changePrice={changePrice}
toggleActive={toggleActive}
deleteMenu={deleteMenu}
/>

))}



</div>

);

}



function MenuCard({

menu,
changePrice,
toggleActive,
deleteMenu

}){

const [editPrice,setEditPrice]=
useState(menu.price);

return(

<div

style={{

border:"1px solid #ccc",
margin:"10px",
padding:"15px",
borderRadius:"10px",
display:"flex",
gap:"20px",
alignItems:"center"

}}

>

<img
src={menu.image_url}
width="80"
/>


<div>

<b>
{menu.name}
</b>

<br/>

<input
value={editPrice}
onChange={
e=>setEditPrice(e.target.value)
}
/>

<button
onClick={()=>
changePrice(menu.id,editPrice)
}
>
เปลี่ยนราคา
</button>

<br/>

Status :

<b>
{menu.active?"ขาย":"ปิด"}
</b>

</div>



<button
onClick={()=>toggleActive(menu)}
>

{menu.active?
"ปิดขาย":
"เปิดขาย"
}

</button>


<button
onClick={()=>deleteMenu(menu.id)}
>
ลบ
</button>


</div>

);

}