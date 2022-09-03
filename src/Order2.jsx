import React from 'react'
import './App.css'
import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { db } from './config'
import  {collection,getDocs,addDoc ,doc,deleteDoc} from 'firebase/firestore';


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

        //console.log(allStorage())


    },[value])
  return (
    <div className="op">
        <h2>Food Cart</h2>
        <h4>Here Are All the Selected Items </h4>

        {
            items.map((item)=>{
               
                item=JSON.parse(item)
                //console.log(item)
                return (<div className="order">
                      
                        <img src={item.link} alt="no image"/>
                   
                    <h2> Name: {item.name} </h2>
                    <h3>   Quantity : <button id='btn' onClick={()=>{
                          const prev=(item.quantity)
                          const newCart = ({name:item.name ,link:item.link,quantity:(prev-1)})
                         
                          localStorage.setItem(item.name,JSON.stringify(newCart))
                          setValue(value+1)

                    }}
                    >-</button> {item.quantity} <button  id='btn' onClick={()=>{
                     const prev=(item.quantity)
                     const newCart = ({name:item.name ,link:item.link,quantity:(prev+1)})
                    
                     localStorage.setItem(item.name,JSON.stringify(newCart))
                     setValue(value+1)

                    }}>+</button> </h3>

                    <button className="rem-btn" onClick={()=>{
                        localStorage.removeItem(item.name)
                        setValue(value+1)
                     

                    }}>
                    Remove
                    </button>



                  
                    
                </div>
                )

            })
        }

         

       

<div>
        <button className="login-btn" onClick={completeOrder}>complete order</button>
        </div>
    </div>


  )
}

export default Order
