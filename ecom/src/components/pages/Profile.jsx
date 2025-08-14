import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import Paper from '@mui/material/Paper';

export default function Profile() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/auth/current-user", { withCredentials: true })
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((err) => {
                console.error("Not logged in or invalid token");
                setUser(null);
            });
    }, []);

    return (
        <div  style={{backgroundColor:"#425f58",height:"79vh",paddingTop:"80px",marginTop:"-10px"}}>
        <div>
            <Paper elevation={3} style={{display:"flex",alignItems:"center",flexDirection:"column",width:"500px",height:"530px",margin:"auto",backgroundColor:"#bed1ca"}}>
            <h1 style={{color:"#2f403d"}}>Profile</h1>
            {user ? (
                <div>
                <div>
                <Paper elevation={3} style={{ padding:"5px 20px",backgroundColor:"#bed1ca"}}>
                    <p>Name : {user.username}</p>
                    <p>Email : {user.email}</p>
                </Paper>
                </div>
               
                </div>

            ) : (
                <p>Please login to view your profile <Button variant="contained" onClick={() => navigate("/login")}>Login</Button></p>
            )}

                <div style={{display:"flex",justifyContent:"space-between",gap:"30px",marginTop:"40px"}}>
                <Paper elevation={3} onClick={()=>navigate("/cart")} style={{ padding:"20px 20px",background: "linear-gradient(to right,#bed1ca,#425f58)",width:"150px",textAlign:"center",justifyContent:"center",cursor:"pointer"}}>
                    <h3>Cart</h3>
                </Paper>
                <Paper elevation={3} style={{ padding:"20px 20px",background: "linear-gradient(to left,#bed1ca,#425f58)",width:"150px",textAlign:"center",justifyContent:"center"}}>
                    <h3>Wishlist</h3>
                </Paper>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",gap:"30px", marginTop:"30px"}}>
                <Paper elevation={3} style={{ padding:"20px 20px",background: "linear-gradient(to right,#bed1ca,#425f58)",width:"150px",textAlign:"center",justifyContent:"center"}}>
                    <h3>Orders</h3>
                </Paper>
                <Paper elevation={3} onClick={()=>navigate("/product/add")} style={{ padding:"20px 20px",background: "linear-gradient(to left,#bed1ca,#425f58)",width:"150px",textAlign:"center",justifyContent:"center",cursor:"pointer" }}>
                    <h3>Add Product</h3>
                </Paper>
                </div>
            </Paper>
        </div>
        </div>
    );
}