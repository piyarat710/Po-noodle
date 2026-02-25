import { useEffect,useState } from "react";
import { supabase } from "./supabase";
import RegisterModal from "./RegisterModal";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(){

const [showRegister,setShowRegister]=useState(false);

const [orders,setOrders]=useState([]);

const [staffs,setStaffs]=useState([]);

const [loading,setLoading]=useState(true);

const [myRole,setMyRole]=useState("");

const [myId,setMyId]=useState("");

const [myEmail,setMyEmail]=useState("");

const navigate=useNavigate();


// ================= logout

const logoutAdmin=async()=>{

await supabase.auth.signOut();

navigate("/login");

};


// ================= user ตัวเอง

const fetchMyProfile=async()=>{

const {data:{user}}
= await supabase.auth.getUser();

if(!user) return;

setMyId(user.id);

const {data}
= await supabase

.from("profiles")

.select("*")

.eq("id",user.id)

.single();

if(data){

setMyRole(data.role ?? "");

setMyEmail(data.email ?? "");

}

};


// ================= orders

const fetchOrders=async()=>{

const {data}

= await supabase

.from("orders")

.select("*")

.order("created_at",{ascending:false});

setOrders(data ?? []);

setLoading(false);

};


// ================= staffs

const fetchStaffs=async()=>{

const {data}

= await supabase

.from("profiles")

.select("*")

.neq("role","disabled");

setStaffs(data ?? []);

};


// ================= delete staff

const deleteStaff=async(staff)=>{

// ห้ามลบตัวเอง

if(staff.id===myId){

alert("ลบตัวเองไม่ได้");

return;

}

// admin ห้ามลบ admin / superadmin

if(

myRole==="admin" &&

(staff.role==="admin" ||

staff.role==="superadmin")

){

alert("ไม่มีสิทธิ์");

return;

}


// ห้ามลบ superadmin

if(staff.role==="superadmin"){

alert("ห้ามลบ Super Admin");

return;

}

if(!window.confirm("ลบพนักงาน ?")) return;

await supabase

.from("profiles")

.delete()

.eq("id",staff.id);

};


// ================= force logout

const forceLogout=async(staff)=>{

// ห้าม logout ตัวเอง

if(staff.id===myId){

return;

}

// admin ห้าม logout admin/superadmin

if(

myRole==="admin" &&

(staff.role==="admin" ||

staff.role==="superadmin")

){

alert("ไม่มีสิทธิ์");

return;

}

// superadmin logout admin ได้

await supabase

.from("profiles")

.update({

role:"disabled"

})

.eq("id",staff.id);

};


// ================= promote

const promoteAdmin=async(id)=>{

if(myRole!=="superadmin") return;

await supabase

.from("profiles")

.update({

role:"admin"

})

.eq("id",id);

};


// ================= downgrade

const downgradeKitchen=async(id)=>{

if(myRole!=="superadmin") return;

await supabase

.from("profiles")

.update({

role:"kitchen"

})

.eq("id",id);

};


// ================= update order

const updateStatus=async(id,status)=>{

await supabase

.from("orders")

.update({status})

.eq("id",id);

};


// ================= LOAD

useEffect(()=>{

fetchMyProfile();

fetchOrders();

fetchStaffs();


// realtime profiles

const staffChannel=

supabase

.channel("profiles")

.on(

"postgres_changes",

{

event:"*",
schema:"public",
table:"profiles"

},

fetchStaffs

)

.subscribe();


// realtime orders

const orderChannel=

supabase

.channel("orders")

.on(

"postgres_changes",

{

event:"*",
schema:"public",
table:"orders"

},

fetchOrders

)

.subscribe();


return()=>{

supabase.removeChannel(staffChannel);

supabase.removeChannel(orderChannel);

};

},[]);




// ================= UI

return(

<div style={{display:"flex"}}>

{/* SIDEBAR */}

<div

style={{

width:"220px",
background:"#111",
color:"white",
height:"100vh",
padding:"20px"

}}

>

<h2>Admin</h2>

<hr/>

{/* ⭐ แสดงตัวเอง */}

<p>

{myEmail}

<b>

 ({myRole})

</b>

</p>

<hr/>

<p>Orders</p>

{(myRole === "admin" || myRole === "superadmin") && (

<p
  onClick={()=>navigate("/admin/menu")}
  style={{cursor:"pointer"}}>  Menu (Soon)</p>
)}


{(myRole === "admin" || myRole === "superadmin") && (

<p
  onClick={()=>navigate("/admin/stats")}
  style={{cursor:"pointer"}}>  Stats (Soon)</p>
)}

<br/>

<button

onClick={()=>navigate("/")}

style={{

width:"100%",
padding:"20px",
marginBottom:"20px",
background:"#8a7f7f",
cursor:"pointer"

}}

>

หน้าหลัก

</button>


<button

onClick={logoutAdmin}

style={{

width:"100%",
padding:"20px",
background:"#443f3e",
color:"white",
cursor:"pointer"

}}

>

ออกจากระบบ

</button>

</div>



{/* CONTENT */}

<div style={{flex:1,padding:"20px"}}>

<h1>สมัครบัญชีพนักงาน</h1>

{loading && <p>Loading...</p>}

<h2>พนักงานทั้งหมด</h2>

<button

onClick={()=>setShowRegister(true)}

style={{marginBottom:"20px"}}

>

เพิ่มพนักงาน

</button>



{staffs.map(staff=>(

<div

key={staff.id}

style={{

border:"1px solid #ccc",
padding:"10px",
marginBottom:"10px",
borderRadius:"10px"

}}

>

<p>

{staff.email}

<b>

 ({staff.role})

</b>

</p>


{/* ลบ */}

{staff.id!==myId &&

!(

myRole==="admin" &&

(staff.role==="admin" ||

staff.role==="superadmin")

)

&&

staff.role!=="superadmin"

&&(

<button

onClick={()=>deleteStaff(staff)}

>

ลบพนักงาน

</button>

)}



{/* logout session */}

{staff.id!==myId &&

!(

myRole==="admin" &&

(staff.role==="admin" ||

staff.role==="superadmin")

)

&&(

<button

style={{marginLeft:"10px"}}

onClick={()=>forceLogout(staff)}

>

Logout Session

</button>

)}



{/* promote */}

{myRole==="superadmin" &&

staff.role==="kitchen" &&(

<button

style={{marginLeft:"10px"}}

onClick={()=>promoteAdmin(staff.id)}

>

ตั้งเป็น Admin

</button>

)}



{/* downgrade */}

{myRole==="superadmin" &&

staff.role==="admin" &&(

<button

style={{marginLeft:"10px"}}

onClick={()=>downgradeKitchen(staff.id)}

>

ลดสิทธิ์

</button>

)}



</div>

))}






{showRegister &&(

<RegisterModal

onClose={()=>setShowRegister(false)}

/>

)}

</div>

</div>

);

}