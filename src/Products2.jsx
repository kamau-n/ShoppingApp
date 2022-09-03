import React from 'react'
import {Link} from 'react-router-dom'
import { useState ,useEffect} from 'react';
import {getDownloadURL, ref,uploadBytesResumable,listAll} from "firebase/storage"
import './App.css';
import {db,storage} from './config'
import  {collection,getDocs,addDoc ,doc,deleteDoc} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword,onAuthStateChanged ,signOut } from "firebase/auth";
const auth = getAuth();




const Products = () => {
    const [cart,setCart] = useState([])
   
    const [data,setData] = useState([])
    const [drinks,setDrinks] = useState([])
    const  mealCollection =  collection(db,"Meals")
    const drinkCollection = collection(db,"Drinks")
    const [noOrder ,setNoOrders] = useState(0)
    const [user,setUser] = useState()



    function allStorage() {

        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
    
        while ( i-- ) {
          
            values.push(localStorage.getItem(keys[i]) );
            
        }
    
        return values;
      
    }
    


    useEffect(()=>{
        listItem()
        listItem2()
        setNoOrders(allStorage().length)
        
       
      },[])


      


//listing all the files that have been uploaded

const listItem = () => {
    //const orders =JSON.parse(localStorage.getItem('order'))
   // setNoOrders(
    //orders.length
    //)
   
    getuser()
    const getMeals = async()=>{
        const data =await getDocs(mealCollection)
        setData(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
       // console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    getMeals()
   



   
  }

  const logout = ()=>{
    signOut(auth).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(("there was an error that occured"))
      // An error happened.
    });
  }

  const listItem2 = () => {
    getuser()
    const getDrinks = async()=>{
        const data =await getDocs(drinkCollection)
        setDrinks(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        //console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    getDrinks()
   



   
  }





  const getuser =() =>{
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log(user.uid)
       console.log(auth.currentUser)
        //alert(auth.currentUser)
        // ...
      } else {
        console.log("there is no user that exist")
        // ...
      }
    });
  }
  
  return (
      <div>
    <div className="main">
        <div className="header">
            <span className="logo">La Doche</span>
            <input type="text" name="item" id="bar"  placeholder="Search..."/>
            <button className="sb">Search</button>


            <div class="dropdown">
                <h2 class="dropbtn">Account</h2>
                   <div class="dropdown-content">
                     <a href="login">Login</a>
                    <a href="signup">SignUp</a>
                    <div>
                   
          </div>
                  </div>
                    </div>
         <Link to="/orders">   <img src={require('./cart.png')} className="cart"/>
         
           <span id="no">  {noOrder} </span></Link>
            <span className="account">
            


            </span>


        </div>
        <h2>Available Meals</h2>
        <div className="body">


            {

                data.map((meal)=>{

                    return

                    /*
                    return <div className="product">



                        <img src={meal.Link} alt="no image"/>
                        <h3>{meal.Name} </h3>
                        <p className="info">
                            <h3>{meal.Restaurant}</h3>
                            <h3>
                                {meal.Price}
                            </h3>

                        </p>
                        <p><button onClick={()=>{
                               const x = ({name:meal.Name,link:meal.Link,quantity:1} )
                               localStorage.setItem(meal.Name,JSON.stringify(x))
                               setNoOrders(noOrder+1)
                              // console.log(typeof items)

                           
                        }}>Order</button></p>

                        </div>

                        */

                })
            }

        </div>

        
        <h2>Available Drinks</h2>

        <div className="body">

{

drinks.map((drink)=>{
    return <div className="product">

        <img src={drink.Link} alt="no image"/>
        <h3>{drink.Name} </h3>
        <p className="info">
            <h3>{drink.Restaurant}</h3>
            <h3>
                {drink.Price}
            </h3>

        </p>
        <p><button onClick={()=>{
                              const x = ({name:drink.Name,link:drink.Link,quantity:1} )
                              localStorage.setItem(drink.Name,JSON.stringify(x))
                              setNoOrders(noOrder+1)
                             // console.log(items)
                            }
                              
                        }>Order</button></p>

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