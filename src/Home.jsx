import CardButton from "./CardButton";
import { useEffect,useState } from "react";
import { supabase } from "./supabase";

export default function Home() {

const [isAdmin,setIsAdmin] = useState(false);
const [checked,setChecked] = useState(false); // ⭐ สำคัญ


useEffect(()=>{

checkAdmin();

},[]);


const checkAdmin = async()=>{

const { data:{user} } =
await supabase.auth.getUser();

if(!user){

setChecked(true);
return;

}

const { data } =
await supabase
.from("profiles")
.select("role")
.eq("id",user.id)
.single();

setIsAdmin(["admin","superadmin"].includes(data?.role)
);
setChecked(true); // ⭐ เช็คเสร็จแล้ว
};


// ⭐ ยังไม่รู้ role = ไม่ render หน้า
if(!checked){
return null; // หรือ loading ก็ได้
}


return (

<div style={{ textAlign: "center", marginTop: "50px" }}>

<h1>ยินดีต้อนรับสู่ Food App</h1>

<p>นี่คือหน้าแรกของเว็บ</p>


<CardButton 
to="/menu" 
title="ไปหน้าเมนู"
subtitle="เลือกเมนูอาหาร" 
style={{ background: "#ffffff" }}
/>


<CardButton
to="/kitchen"
title="หน้าพนักงาน"
subtitle="สำหรับพนักงาน"
style={{ background: "#ffffff" }}
/>


<CardButton 
to="/stats"
title="สถิติร้าน"
subtitle="สถิติร้าน"
style={{ background: "#ffffff" }}
/>



{/* ADMIN ONLY */}

{isAdmin && (

<CardButton
to="/admin"
title="ไปหน้า Admin"
subtitle="สำหรับผู้ดูแลระบบ"
style={{ background: "#ffffff" }}
/>

)}

</div>

);

}