import { useEffect,useState } from "react";
import { supabase } from "./supabase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children,role}){

const [loading,setLoading]=useState(true);
const [allow,setAllow]=useState(false);

 useEffect(()=>{
 checkUser();
 },[]);

const checkUser = async()=>{

            const { data:{ session } } =
            await supabase.auth.getSession();

            if(!session){

            setAllow(false);
            setLoading(false);

            return;

            }

            
const { data:{user} } =
await supabase.auth.getUser();

    if(!user){
    setAllow(false);
    setLoading(false);
    return;
    }

// หา role จาก profiles
const { data } =
await supabase
.from("profiles")
.select("role")
.eq("id",user.id)
.single();

      if(role){

// ⭐ admin route = admin + superadmin เข้าได้

                if(role === "admin"){

                setAllow(

                data?.role === "admin" ||

                data?.role === "superadmin"

                );

                }else{

                setAllow(data?.role === role);

                }

                }else{

                setAllow(true);

                }
                setLoading(false);
                };


        if(loading){
        return <div>Loading...</div>; }
        return allow ? children : <Navigate to="/login"/>

}