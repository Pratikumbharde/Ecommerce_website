const express=require("express")
const router=express.Router()
const Product=require("./models/Product")


router.get("/productlist",async(req,res)=>{
    try{
    const alllisting=await Product.find()
    res.json(alllisting)
    }
    catch(err){
        console.log(err)
    }
})

router.post("/product/add", async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body, owner: req.user.id });
        await newProduct.save();
        res.status(201).json({ message: "Data saved successfully"}); 
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});


router.get("/product/:id",async(req,res)=>{
    try{
    const product=await Product.findById(req.params.id).populate("owner");
    res.json(product)
    }
    catch(err){
        console.log(err)
    }
})

router.put("/product/update/:id",async(req,res)=>{
    try{
    const product=await Product.findByIdAndUpdate(req.params.id,req.body)
    res.json({message:"Updated successfully"})
    }
    catch(err){
        console.log(err)
    }
})

router.delete("/product/delete/:id",async(req,res)=>{
    try{
    const product=await Product.findByIdAndDelete(req.params.id) 
    res.json({message:"Deleted successfully"})
    }
    catch(err){
        console.log(err)
    }
})


router.get("/productsearch", async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      category,
      sort,
    } = req.query;

    const query = {};

    // 🔍 Search by name (case insensitive)
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // 💰 Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 🏷️ Filter by category
    if (category) {
      query.category = category;
    }

    // ↕️ Sort by price
    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

 

    // 🛒 Final DB query
    const products = await Product.find(query)
      .sort(sortOption)

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


  

module.exports=router