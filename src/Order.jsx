import React from 'react'
import './App.css'
import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { db } from './config'
import  {collection,getDocs,addDoc ,doc,deleteDoc} from 'firebase/firestore';
import { Grid } from '@mui/material'
import Cart from './Cards/Cart'


const Order = () => {
   // const [orders,setOrders] = useState([])
   const orderCollection = (collection,"Order")
    const[items,setItems] = useState([])
    const [value ,setValue] = useState(0)

  

  
    const completeOrder= () => {
        const y = (allStorage())


        

    }

    function allStorage() {

        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
    
        while ( i-- ) {
          
            values.push(localStorage.getItem(keys[i]) );
            
        }
    
        return values;
      
    }
    

    const populate = ()=>{
     
        //console.log(JSON.parse(localStorage.getItem('order')))
    }

    useEffect(()=>{
        //populate()
        setItems( allStorage())

        console.log( allStorage())


    },[value])


  return (

    
<div>


<main style ={{
 width:'90%',
 margin:'auto',

}}>
 <h1>Meals Cart</h1>
    <Grid container justify="center" spacing={2}>
        {

         items.map((product)=>(
            product=JSON.parse(product),

                <Grid item key = {product.id} xs={12} sm={8} lg ={3} style={{
                 marginTop:10
                }}>
                    <Cart product = {product}/>

                    </Grid>


            ))
        }


    </Grid>

</main>

<Link to = "/"><h3>Back Home</h3></Link>
</div>
  )

}


export default Order;