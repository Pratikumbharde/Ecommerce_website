import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: ""
  });

  const [message, setMessage] = useState("");

  // Fetch product details for pre-filling the form
  useEffect(() => {
    axios.get(`http://localhost:5000/products/product/${id}`)
      .then(res => {
        setForm(res.data);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
      });
  }, [id]);

  const onChangeHandle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/products/product/update/${id}`, form, {
      withCredentials: true
    })
      .then(res => {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate(`/product/${id}`);
        }, 1000);
      })
      .catch(err => {
        console.error("Error updating product:", err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>
      <form onSubmit={onSubmitHandle}>
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={onChangeHandle} /><br />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={onChangeHandle} /><br />
        <input type="text" name="price" placeholder="Price" value={form.price} onChange={onChangeHandle} /><br />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={onChangeHandle} /><br />
        <input type="text" name="stock" placeholder="Stock" value={form.stock} onChange={onChangeHandle} /><br />
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={onChangeHandle} /><br />
        <button type="submit">Update Product</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
