import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./homepage.css"

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/current-user", {
        withCredentials: true, 
      })
      .then((res) => {
        setUser(res.data.user); 
      })
      .catch((err) => {
        console.error("Not logged in or invalid token");
        setUser(null);
      });
  }, []);

  return (
    <div className="background">
    <img style={{width:"400px",height:"150px",marginTop:"90px",marginLeft:"200px"}} src="/vouge.png" alt="" />
    <h4 style={{marginLeft:"240px",marginTop:"3px",fontSize:"20px",color:"white"}}>Elevate your style. Discover your Vogue.</h4>
    <div style={{marginLeft:"320px",marginTop:"180px"}}>
          <Button style={{backgroundColor:"#151e1d",width:"200px",height:"40px"}} variant="contained" onClick={() => navigate("/productlist")}>
            Start Shopping!
          </Button>      
    </div>
    </div>
  );
}
