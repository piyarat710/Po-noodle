import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabase";

export default function Login() {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate = useNavigate();

const handleLogin = async () => {

// login supabase

const { data , error } =
await supabase.auth.signInWithPassword({

email,
password

});

if(error){

alert(error.message);

return;

}

// หา role

const { data:profile , error:profileError } =
await supabase
.from("profiles")
.select("role")
.eq("id",data.user.id)
.single();

if(profileError){

alert("ไม่พบสิทธิ์ผู้ใช้");

return;

}

alert("เข้าสู่ระบบสำเร็จ");

// ⭐ บันทึก role ไว้ในเครื่อง
localStorage.setItem("role", profile.role);
localStorage.setItem("isStaff", "true");

// เด้งตาม role
if(
profile.role === "admin" ||
profile.role === "superadmin"
){
navigate("/admin");
}else{
navigate("/kitchen");
}




};

return (
<div
style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#f2f2f2"
}}
>

<div
style={{
background:"white",
padding:"30px",
borderRadius:"12px",
width:"100%",
maxWidth:"400px",
boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
}}
>

<h2 style={{ textAlign:"center",marginBottom:"20px"}}>

เข้าสู่ระบบพนักงาน

</h2>

<input
type="text"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"10px",
borderRadius:"8px",
border:"1px solid #ccc"
}}/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"20px",
borderRadius:"8px",
border:"1px solid #ccc"
}}
/>

<button
onClick={handleLogin}
style={{
width:"100%",
padding:"12px",
fontSize:"16px",
background:"#4caf50",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}>
เข้าสู่ระบบ
</button>


<Link to="/">
<button
style={{
width:"100%",
padding:"12px",
fontSize:"16px",
background:"#d6de3c",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer",
marginTop:"10px"
}}>
กลับหน้าแรก
</button>
</Link>



</div>
</div>
);
}