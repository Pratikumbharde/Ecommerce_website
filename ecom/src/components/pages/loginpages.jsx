import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate=useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/auth/login",form,{withCredentials:true})
      .then(res => {
        setMsg(res.data.message)
        setTimeout(() => {
          navigate('/productlist')
        }, 2000);
      })
      .catch(err => setMsg(err.response.data.message));
  };

return (
<form onSubmit={handleSubmit}>
<input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" />
<input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
<input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
<button type="submit">Signup</button>
<p>{msg}</p>
</form>
  );
}
