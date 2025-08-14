import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const[message,setmessage]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:5000/auth/logout",{withCredentials:true})
        .then(res=>{
            console.log(res.data)
            setmessage(res.data.message)
            navigate('/')

        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return(
        <div>
            <h1>Logout</h1>
            <p>{message}</p>
        </div>
    )
}