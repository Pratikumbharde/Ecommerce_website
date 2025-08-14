const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const productlisting=require("./productlist")
const cookieParser = require("cookie-parser");
const authRoutes = require("./authroutes");
require("dotenv").config();
const reviewRoutes = require("./reviewroutes");
const adminRoutes = require("./adminroutes");
const cartRoutes = require("./cartroutes");
const orderRoutes = require("./paymentroute");

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log(err)
})


app.use(express.json())
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/products",productlisting)
app.use("/reviews", reviewRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// app.get("/",(req,res)=>{
//     res.send("Hello World")
// })

app.listen("5000",()=>{
    console.log("Server is listening on port 5000")
}) 