import { useState } from "react";
import { supabase } from "./supabase";

export default function RegisterModal({ onClose }) {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const createStaff = async()=>{

try{

// ⭐ เก็บ session admin
const {
data:{session:adminSession}
}
= await supabase.auth.getSession();

if(!adminSession){

alert("session admin หาย");

return;

}


// =================
// สมัคร user ใหม่
// =================

const { data , error } =
await supabase.auth.signUp({

email,
password

});

if(error){

alert(error.message);

return;

}


// =================
// restore admin
// =================

await supabase.auth.setSession({

access_token:adminSession.access_token,
refresh_token:adminSession.refresh_token

});


// =================
// insert profile
// =================

await supabase

.from("profiles")

.insert({

id:data.user.id,
email:data.user.email,
role:"kitchen"

});


alert("เพิ่มพนักงานแล้ว");

onClose();

}catch(e){

console.error(e);

alert("สมัครไม่สำเร็จ");

}

};


return(

<div
style={{

position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.5)",

display:"flex",
justifyContent:"center",
alignItems:"center"

}}
>

<div
style={{

background:"white",
padding:"25px",
borderRadius:"10px",
width:"400px"

}}
>

<h3>เพิ่มพนักงาน</h3>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={createStaff}>

เพิ่มพนักงาน

</button>

<button
onClick={onClose}
style={{marginLeft:"10px"}}
>

ปิด

</button>

</div>

</div>

);

}