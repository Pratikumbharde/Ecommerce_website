import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from "@mui/material";
import {Paper} from '@mui/material';
import { useScroll } from "motion/react";
import { motion } from "motion/react";

export default function Alllisting(){
   const navigate=useNavigate()
   const[productlist,setProductlist]=useState([])
   const { scrollYProgress } = useScroll();
   const handleViewDetails=(id)=>{
      navigate(`/product/${id}`)
   }
   
   useEffect(()=>{
      axios.get("http://localhost:5000/products/productlist")
      .then((res)=>{
         setProductlist(res.data)
      })
      .catch((err)=>{
         console.log(err)
      })
   },[])

 return(
    <div style={{marginTop:"-10px",backgroundColor:"#85a79d",padding:"40px"}}>

<Grid container spacing={2} columnSpacing={"90px"} rowSpacing={"40px"} style={{marginLeft:"120px"}}>
  {productlist.map((product) => (
    <Grid 
      key={product._id} 
      sx={{
        flexBasis: {
          xs: '100%',    
          sm: '50%',     
          md: '25%',     
          lg: '25%',     
        },
        maxWidth: {
          xs: '100%',
          sm: '50%',
          md: '25%',
          lg: '25%',
        },
      }}
    >
  <motion.div whileHover={{ scale: 1.1 }} animate={{y:[-50,0],opacity:1,transition:{duration:0.5,ease:"easeInOut"}}} initial={{opacity:0}}>
<Paper elevation={3}  style={{borderRadius:"20px"}}>
 < Card sx={{ width: 350,borderRadius:"20px"}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={product.image}
        style={{objectFit:"cover",backgroundColor:"#dfe8e5"}}
      />
      <CardContent style={{backgroundColor:"#425f58",color:"white"}}>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:"oswald",textAlign:"center"}}>
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'dark-gray',textAlign:"center",fontFamily:"oswald" }}>
          {product.price}
        </Typography>
      </CardContent>
      <CardActions style={{backgroundColor:"#384d49",display:"flex",justifyContent:"center"}} >
        <Button size="small" style={{color:"white",fontFamily:"oswald"}} onClick={() => handleViewDetails(product._id)}>View Details</Button>
      </CardActions>
    </Card>
    </Paper>
    </motion.div>
    </Grid>
  ))}
</Grid>

    </div>
 )
}