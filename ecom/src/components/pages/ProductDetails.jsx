import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button, TextField, Rating, Box } from "@mui/material";
import { motion } from "motion/react"
import { useRef } from "react";
import Paper from '@mui/material/Paper';

export default function ProductDetail() {
  const [Details, setDetails] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedSize, setSelectedSize] = useState("");


  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef();

  useEffect(() => {
    // Fetch product details
    axios
      .get(`http://localhost:5000/products/product/${id}`, { withCredentials: true })
      .then((res) => {
        console.log("Product Detail Response:", res.data);
        setDetails(res.data);
      })
      .catch((err) => console.log(err));

    // Fetch logged-in user
    axios
      .get("http://localhost:5000/auth/me", { withCredentials: true })
      .then((res) => setLoggedInUser(res.data))
      .catch((err) => console.log(err));

    // Fetch reviews
    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const isOwner =
    loggedInUser &&
    Details.owner &&
    loggedInUser._id === Details.owner._id;

  const handleReviewSubmit = async () => {
    if (!rating || !comment.trim()) return alert("Rating and comment required");

    try {
      const res = await axios.post(
        `http://localhost:5000/reviews/${id}`,
        { rating, comment },
        { withCredentials: true }
      );
      setReviews([...reviews, res.data]);
      setRating(0);
      setComment("");
    } catch (err) {
      alert("Failed to submit review");
      console.log(err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${reviewId}`, {
        withCredentials: true,
      });
      setReviews(reviews.filter((r) => r._id !== reviewId));
      alert("Review deleted");
    } catch (err) {
      console.log("Failed to delete review", err);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/cart/add",
        { productId: Details._id, quantity: 1, size: selectedSize },
        { withCredentials: true }
      );
      alert("Added to cart");
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div style={{backgroundColor:"#bed1ca",paddingTop:"30px",marginTop:"-10px"}}>

      <motion.h2 style={{textAlign:"center",fontFamily:"oswald",fontWeight:800,fontSize:"30px"}} initial={{opacity:0}} animate={{y:[-50,0],opacity:1,transition:{duration:0.5,ease:"easeInOut"}}} >{Details.name}</motion.h2>
     
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={{ marginTop: "80px", marginLeft: "190px" }}>
            <img  src={Details.image} alt="" width={"400px"} height={"400px"} />
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} marginTop={8} marginLeft={30}>

         <Paper elevation={3} style={{ padding:"5px 20px",backgroundColor:"#bed1ca",fontFamily:"oswald"}}><motion.p initial={{opacity:0}}  animate={{y:[-50,0],opacity:1,transition:{duration:0.5,ease:"easeInOut"}}} >{Details.description }</motion.p></Paper>
           <Paper elevation={3} style={{ padding:"5px 20px",backgroundColor:"#bed1ca",marginTop:"20px",fontFamily:"oswald"}}><motion.p initial={{opacity:0}} animate={{y:[-50,0],opacity:1,transition:{duration:0.5,ease:"easeInOut"}}} >₹{Details.price}</motion.p></Paper>
           <Paper elevation={3} style={{ padding:"5px 20px",backgroundColor:"#bed1ca",marginTop:"20px",fontFamily:"oswald"}}><motion.p initial={{opacity:0}} animate={{y:[-50,0],opacity:1,transition:{duration:0.5,ease:"easeInOut"}}} >Category: {Details.category}</motion.p></Paper>
          
          {Array.isArray(Details.sizes) && (
  <Paper elevation={3} style={{ padding:"20px 20px",backgroundColor:"#bed1ca",marginTop:"20px",fontFamily:"oswald"}}>
  <motion.div animate={{y:[-50,0],opacity:1,transition:{duration:0.5,ease:"easeInOut"}}} >
    <label>Select Size: </label>
    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value) } style={{backgroundColor:"inherit"}}>
      <option value="">--Select--</option>
      {Details.sizes.map((s, i) => (
        <option key={i} value={s.size} >
          {s.size} ({s.stock} in stock)
        </option>
      ))}
    </select>
  </motion.div>
</Paper>)}
<Paper elevation={3} style={{backgroundColor:"#bed1ca",padding:"5px 20px",marginTop:"20px",fontFamily:"oswald"}}>
      
        <motion.p style={{fontFamily:"oswald"}} initial={{opacity:0}} animate={{y:[-50,0],opacity:1,transition:{duration:0.5,ease:"easeInOut"}}} >
          Average Rating:{" "}
          {typeof Details.rating === "number"
            ? Details.rating.toFixed(1)
            : "No rating"}
        </motion.p>
        <motion.p initial={{opacity:0}} animate={{y:[-50,0],opacity:1,transition:{duration:0.5,ease:"easeInOut"}}}  style={{fontFamily:"oswald",marginTop:"-15px"}}>Total Reviews: {Details.numReviews || 0}</motion.p>
     
      </Paper>

          
<div style={{marginTop:"40px",display:"flex",justifyContent:"center",gap:"20px"}}>
          {isOwner && (
            <>
              <Button
                variant="contained"
                color="error"
                style={{backgroundColor:"#2f403d",width:"150px"}}
                onClick={() => {
                  axios
                    .delete(`http://localhost:5000/products/product/delete/${id}`, {
                      withCredentials: true,
                    })
                    .then(() => {
                      alert("Deleted successfully");
                      navigate("/products");
                    });
                }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{backgroundColor:"#2f403d",width:"150px"}}
                onClick={() => navigate(`/product/update/${id}`)}
              >
                Edit
              </Button>
            </>
          )}
</div>        
<Button onClick={handleAddToCart} style={{marginTop: "20px",width:"325px",backgroundColor:"#2f403d",color:"white" }}>
        Add to Cart
      </Button>

</Grid>
      </Grid>

<div style={{backgroundColor:"#85a79d",padding:"10px",borderRadius:"30px",marginTop:"60px",marginLeft:"20px",marginRight:"20px",marginBottom:"30px"}}>
<motion.h2 style={{textAlign:"center",fontFamily:"oswald",fontWeight:800,fontSize:"30px"}} animate={{y:[-50,0],transition:{duration:0.5,ease:"easeInOut"}}} >Reviews</motion.h2>
      {/* Product Rating Summary */}


      <Paper elevation={3} style={{backgroundColor:"#85a79d",padding:"40px",borderRadius:"30px",marginTop:"40px",marginLeft:"150px",marginRight:"150px",marginBottom:"30px",display:"flex",justifyContent:"center",textAlign:"center"}}>
      <Box>
        <h3 style={{color:"#2a3734",marginTop:"-10px"}}>Write a Review</h3>
        {loggedInUser ? (
          <>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              margin="normal"
              style={{color:"#2a3734"}}
            />
            <Button variant="contained" onClick={handleReviewSubmit} style={{backgroundColor:"#2a3734",marginTop:"15px"}}>
              Submit Review
            </Button>
          </>
        ) : (
          <p>Please login to leave a review.</p>
        )}
      </Box>
      </Paper>
      {/* Display Reviews */}
     <Paper elevation={3} style={{padding:"20px",backgroundColor:"inherit",borderRadius:"20px",marginTop:"40px",marginLeft:"20px",marginRight:"20px",marginBottom:"20px"}}>
      <Box marginTop={4} display={"flex"} justifyContent={"center"} gap={6}>
      
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((rev) => (
           <Paper elevation={3} style={{backgroundColor:"#6f9289"}}> 
            <Box
              key={rev._id}
              width={"500px"}
              padding={2}
              marginY={2}
             
              borderRadius="10px"
              backgroundColor="inherit"
              color={"#2a3734"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              <h4>{rev.user.username}</h4>
              <Rating value={rev.rating} readOnly style={{color:"#425f58"}} />
              <p>{rev.comment}</p>
              <p style={{ fontSize: "12px",color:"#2a3734" }}>
                {new Date(rev.createdAt).toLocaleString()}
              </p>
              {loggedInUser?._id?.toString() === rev.user?._id?.toString() && (
                <Button
                  style={{backgroundColor:"#2a3734",color:"white",width:"100px"}}
                  size="small"

                  variant="outlined"
                  onClick={() => handleDeleteReview(rev._id)}
                >
                  Delete
                </Button>
              )}
            </Box>
            </Paper>
          ))
        )}
      </Box>
      </Paper>
      </div>
    </div>
  );
}
