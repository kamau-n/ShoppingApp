import React from 'react'
import {Link} from 'react-router-dom'
import { useState ,useEffect} from 'react';
import {getDownloadURL, ref,uploadBytesResumable,listAll} from "firebase/storage"
import './App.css';
import {db,storage} from './config'
import  {collection,getDocs,addDoc ,doc,deleteDoc} from 'firebase/firestore';

const Products = () => {
    const [cart,setCart] = useState([])
    const [selected ,setSelected] = useState(0)
    const [data,setData] = useState([])
    const  mealCollection =  collection(db,"Meals")
    
    const addCart = (name,quantity)=>{
        //localStorage.setItem()
        const meal = ({
            name:name,
            quantity:quantity,

        })
        setSelected(selected+1)


    }

    useEffect(()=>{
        listItem()
      },[])



//listing all the files that have been uploaded

const listItem = () => {
    const getMeals = async()=>{
        const data =await getDocs(mealCollection)
        setData(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    getMeals()
   



   
  }
  
  return (
      <div>
    <div className="main">
        <div className="header">
            <span className="logo">La Doche</span>
            <input type="text" name="item" id="bar"  placeholder="Search..."/>
            <button className="sb">Search</button>
            <img src={require('./cart.png')} className="cart"/>
         
            {selected}
            <span className="account">
                <Link to="/login">Account</Link>

            </span>


        </div>
        <h2>Available Meals</h2>
        <div className="body">


            {

                data.map((meal)=>{
                    return <div className="product">

                        <img src={meal.Link} alt="no image"/>
                        <h3>{meal.Name} </h3>
                        <p className="info">
                            <h3>{meal.Restaurant}</h3>
                            <h3>
                                {meal.Price}
                            </h3>

                        </p>
                        <p><button onClick={addCart}>Order</button></p>

                        </div>

                })
            }


        </div>


        </div>
<div className="footer">
    <ul>
        <li><h3>Important Links</h3></li>
        <li>About</li>
        <li>Policies</li>
        <li>uploads</li>
        <li>Home</li>
        <li>Mail</li>
        <li>About</li>
    </ul>

    <ul>
        <li><h3>Social Media</h3></li>
        <li>Facebook</li>
        <li>Twitter</li>
        <li>Instagram</li>
        <li>Linkedn</li>
        <li>Tiktok</li>
    </ul>

    <ul>
        <li><h3>About Us</h3></li>
        <li>Terms and Condition</li>
        <li>Supplier</li>
        <li>Owner</li>
        <li>Services</li>
        <li>Sell with us</li>
    </ul>

    <ul>
        <li><h3>Contact  Us</h3></li>
        <li>Phone : +254 67868678</li>
        <li>Fax:23244 234235 </li>
        <li>Email:info@ladoche@gmail.com</li>
        <li>Address :private bag 08939</li>
        <li>Location:Nairobi</li>
    </ul>

    <ul>
        <li><h3>Location</h3></li>
        <li>Kenya</li>
        <li>Uganda</li>
        <li>Tanzania</li>
        <li>Burundi</li>
        <li>Rwanda</li>
    </ul>

    <div>
        <h3>Comments</h3>
        <div className="comments">
            <input type="text" placeholder="Enter Your Name" />
            <input type="email" placeholder="Enter Your Email" />
            <textarea placeholder="Enter Your Message Here" rows="5"/>
            <button>Submit</button>
        
           
        </div>

   
    </div>

</div>
 

    </div>


  )
}

export default Products