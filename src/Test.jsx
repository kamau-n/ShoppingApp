import React from 'react'
import { Grid } from '@mui/material'
import Products from './assets/Assests'
import Item from './Item'
const Test = () => {
  return (
 <main>
     <Grid container justify="center" spacing={4}>
         {

             Products.map((product)=>(
                 <Grid item key = {product.id} xs={12} sm={6} lg ={3}>
                     <Item product = {product}/>




                     </Grid>


             ))
         }


     </Grid>
 </main>
  ) 
}

export default Test