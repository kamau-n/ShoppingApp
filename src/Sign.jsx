import React from 'react'
import {Link} from 'react-router-dom'
//import {auth} from './config'
import {useState ,useEffect} from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();




const Login =() =>{

  const [errors,setError] = useState('')
  const [useremail,setUseremail] = useState()
  const [password,setPassword] = useState()
  const [address,setAddress] = useState()
  const [firstname,setFirstname] = useState()
  const [lastname,setLastname] = useState()
  const [number,setNumber] = useState()
  

  
  const signup=()=>{
    console.log(useremail,password,address,firstname,lastname)
    
    createUserWithEmailAndPassword(auth, useremail, password,firstname,lastname,address,number)

    .then((res)=>{
      console.log(res)

    })
    .catch((err)=>{
        setError(err.message)
        console.log(err.message)
    })

    

  }

 

   return (
    <div className='login'>
        <h2>LA DOCHE</h2>
        <h3>Enter Your Email Address</h3>
        <span className='errors'>{errors}</span>
     <div className="login-btn">   <input type="email" placeholder="Email"
     onChange={(e)=>{setUseremail(e.target.value)}}
     /></div>
       
        <div className="login-btn"><input type="Text" placeholder="FirstName"
        onChange={(e)=>{setFirstname(e.target.value)}}
        /></div>

        <div className="login-btn"><input type="text" placeholder="LastName"
        onChange={(e)=>{setLastname(e.target.value)}}
        /></div>

        <div className="login-btn"><input type="text" placeholder="PhoneNumber"
        onChange={(e)=>{setNumber(e.target.value)}}
        /></div>
      
      <div className="login-btn"><input type="text" placeholder="Address"
        onChange={(e)=>{setAddress(e.target.value)}}
        /></div>
      
      <div className="login-btn"><input type="password" placeholder="Password"
        onChange={(e)=>{setPassword(e.target.value)}}
        /></div>
      
      

        <div>
        <button className="login-btn" onClick={signup}>SignUp</button>
        </div>

        <div>
        <button className="login-btn">GetUSer</button>
        </div>
       

<Link to = "/">Home</Link>
<Link to = "/login">Login</Link>

 




    </div>
  )
}

export default Login