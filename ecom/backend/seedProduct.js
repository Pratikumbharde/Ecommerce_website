const mongoose=require("mongoose")
const Product = require("./models/Product");

const sampleProducts = [
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "AirStride Running Shoes",
    description: "Lightweight shoes perfect for everyday runs.",
    price: 2499,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "UrbanFlex Sneakers",
    description: "Stylish sneakers for urban exploration.",
    price: 3199,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "TrailBlazer Hiking Boots",
    description: "Durable boots for hiking and trekking.",
    price: 3999,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "RetroCanvas Low Tops",
    description: "Classic low-top canvas shoes.",
    price: 1799,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "PowerGrip Sports Shoes",
    description: "Enhanced grip and cushion for athletes.",
    price: 2899,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "SlimFit Stretch Jeans",
    description: "Modern slim-fit jeans with stretchable fabric.",
    price: 2099,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Classic White T-Shirt",
    description: "Cotton t-shirt with a relaxed fit.",
    price: 699,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Formal Slim Shirt",
    description: "Perfect for office and business meetings.",
    price: 1499,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Yoga Comfort Leggings",
    description: "Soft, stretchable leggings for fitness and casual wear.",
    price: 999,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Fleece Zip Hoodie",
    description: "Warm and stylish hoodie for winter days.",
    price: 1999,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Denim Jacket",
    description: "Classic blue denim jacket with button front.",
    price: 2599,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Athletic Track Pants",
    description: "Breathable and light pants for workouts.",
    price: 1299,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Chukka Leather Boots",
    description: "Premium leather boots with durable sole.",
    price: 4499,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "High Top Basketball Shoes",
    description: "Built for performance on and off the court.",
    price: 3799,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Relaxed Fit Cargo Pants",
    description: "Multiple pockets and relaxed fit for daily use.",
    price: 1599,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },  
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Graphic Printed Tee",
    description: "Trendy print with ultra-soft cotton.",
    price: 799,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Winter Thermal Socks (3 Pack)",
    description: "Keeps your feet warm and cozy.",
    price: 499,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Waterproof Running Shoes",
    description: "Stay dry and light while running in rain.",
    price: 3399,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Knitted Sweater",
    description: "Wool-blend sweater for warm comfort.",
    price: 1899,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Breathable Gym Tank",
    description: "Moisture-wicking tank top for workouts.",
    price: 599,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Slip-on Comfort Loafers",
    description: "Everyday wear with easy slip-on design.",
    price: 2499,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: "/cup.png"
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Flannel Button-Up Shirt",
    description: "Comfortable, warm, and perfect for layering.",
    price: 1399,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: ""
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Puffer Vest Jacket",
    description: "Layer up with this lightweight insulated vest.",
    price: 2799,
    category: "clothing",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: ""
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Mesh Running Trainers",
    description: "Highly breathable design for long runs.",
    price: 2199,
    category: "shoes",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: ""
  },
  {
    owner: "687fa3677e297b789dfe3f26",
    name: "Stretch Chinos",
    description: "Sleek and stretchable chinos for any occasion.",
    price: 1699,
    category: "clothing",
      sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 5 },
    ],
    image: ""
  }
]

  
  

  mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
  .then(()=>{
      console.log("Database connected")
  })
  .catch((err)=>{
      console.log(err)
  })
  

  const seeddata=async()=>{
    try {
      await Product.deleteMany({})
      await Product.insertMany(sampleProducts)
      console.log("Data seeded successfully")
    } catch (error) {
        console.log(error)
    }
  }

  seeddata();