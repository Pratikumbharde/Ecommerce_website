import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate=useNavigate()
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const fetchProducts = async (e) => {
    try {
      e.preventDefault();
      const queryParams = new URLSearchParams();

      if (search) queryParams.append("search", search);
      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);
      if (category) queryParams.append("category", category);
      if (sort) queryParams.append("sort", sort);

      const res = await axios.get(`http://localhost:5000/products/productsearch?${queryParams.toString()}`);
      setProducts(res.data);
      setSearch("");
      setMinPrice("");
      setMaxPrice("");
      setCategory("");
      setSort("");
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // useEffect(() => {
  //   fetchProducts();
  // }, [search, minPrice, maxPrice, category, sort]);

  return (
    <div>
      <h2>Product List</h2>

      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <button onClick={fetchProducts}>Search</button>
      </div>

      <div>
        {products.map((product) => (
          <div key={product._id} style={{border:"1px solid black",margin:"10px",padding:"10px",width:"20%",display:"inline-block",height:"160px",marginTop:"50px"}}>
            <strong>{product.name}</strong> - ₹{product.price} - {product.category}
            
            
            <Button style={{marginTop:"95px"}} variant="contained" onClick={()=>navigate(`/product/${product._id}`)}>View Details</Button>
          </div>
        ))}
      </div>

    
    </div>
  );
}
