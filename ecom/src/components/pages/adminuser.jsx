import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Adminuser(){

const[user,setUser]=useState([])
const navigate=useNavigate()
useEffect(() => {
    axios.get("http://localhost:5000/admin/users", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          alert("You are not an admin");
          navigate("/");
        } else {
          console.log(err);
        }
      });
  
    
  
  
    }, []);
  
    return(
        
        <div>
            <h2>Adminuser</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>isAdmin</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user)=>(
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}