import { useState } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";


export default function Register(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [loading,setLoading]=useState(false);
const [role,setRole]=useState("kitchen");
const navigate = useNavigate();

// ตรวจ email

const validateEmail =(email)=>{

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

};


const handleRegister = async()=>{

// ตรวจ email

if(!validateEmail(email)){

alert("Email ไม่ถูกต้อง");

return;

}


// password

if(password.length <6){
alert("Password อย่างน้อย 6 ตัว");
return;
}
setLoading(true);
const { data , error } =
await supabase.auth.signUp({
email:email.trim(),
password,
});


if(error){
alert(error.message);
setLoading(false);
return;
}


// create profile
// create profile
if(data.user){
const { error: profileError } =
await supabase
.from("profiles")
.insert({
id:data.user.id,
email:data.user.email,
role:"kitchen"
});
if(profileError){
console.log(profileError);
alert(profileError.message);
setLoading(false);
return;
}
}
alert("สมัครสำเร็จ");
setLoading(false);
setTimeout(()=>{
navigate("/login");
},500);
};



    return(
        <div style={{padding:"30px"}}>
        <h2>สมัครบัญชีพนักงาน</h2>


        <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />


        <br/><br/>
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />


                        <div style={{marginTop:"20px"}}>
                        <button
                        onClick={handleRegister}
                        disabled={loading}
                        >
                        {loading ? "กำลังสมัคร..." : "สมัคร"}
                        </button>
                        
                        <button
                        style={{marginLeft:"10px"}}
                        onClick={()=>navigate("/login")}
                        >
                        กลับ หน้าLogin
                        </button>
                        </div>




        </div>
    );
}