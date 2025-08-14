import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddProductForm() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [Form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: ""
  });
  const navigate = useNavigate();

  const onChangehandle = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const onSubmithandle = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/products/product/add", Form, { withCredentials: true })
      .then((res) => {
        const { message } = res.data;
        setMessage(message);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(Form);
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: ""
    });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/auth/current-user", { withCredentials: true })
      .then((res) => {
        const currentUser = res.data.user;
        console.log(res)
        setUser(currentUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h2>Add Product</h2>
          <input type="text" placeholder="Product Name" onChange={onChangehandle} value={Form.name} name="name" />
          <input type="text" placeholder="Product Description" onChange={onChangehandle} value={Form.description} name="description" />
          <input type="text" placeholder="Product Price" onChange={onChangehandle} value={Form.price} name="price" />
          <input type="text" placeholder="Product Category" onChange={onChangehandle} value={Form.category} name="category" />
          <input type="text" placeholder="Product Stock" onChange={onChangehandle} value={Form.stock} name="stock" />
          <input type="text" placeholder="Product Image" onChange={onChangehandle} value={Form.image} name="image" />
          <button onClick={onSubmithandle}>Add Product</button>
          <p>{message}</p>
        </>
      ) : (
        <p>Please login to add a product <Button variant="contained" onClick={() => navigate("/login")}>Login</Button></p>
      )}
    </div>
  );
}
