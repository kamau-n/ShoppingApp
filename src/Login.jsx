import React from 'react'
import {Link,Navigate} from 'react-router-dom'
//import {auth} from './config'
import {useState ,useEffect} from 'react';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword,onAuthStateChanged ,signOut } from "firebase/auth";

const auth = getAuth();


//import firebase from 'firebase/compat/app';
//import * as firebaseui from 'firebaseui'
//import 'firebaseui/dist/firebaseui.css'

const Login =() =>{


  const [useremail,setUseremail] = useState()
  const [password,setPassword] = useState()
  

  
  const signup=()=>{
    console.log(useremail,password)
    createUserWithEmailAndPassword(auth, useremail, password)

    .then((res)=>{
      console.log(res)

    })
    .catch((err)=>{console.log(err)})

  }

 

  const signin=() =>{
    console.log(useremail,password)
    signInWithEmailAndPassword(auth, useremail, password)
    .then((res)=>{
      console.log(res.user);
      <Navigate to="/" replace={true} />

    })
    .catch((err)=>{console.log(err)})


  }
  const logout = ()=>{
    signOut(auth).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(("there was an error that occured"))
      // An error happened.
    });
  }

  
   return (
    <div className='login'>
        <h2>LA DOCHE</h2>
        <h3>Enter Your Email Address</h3>
     <div className="login-btn">   <input type="email" placeholder="Email"
     onChange={(e)=>{setUseremail(e.target.value)}}
     /></div>
       
        <div className="login-btn"><input type="password" placeholder="Password"
        onChange={(e)=>{setPassword(e.target.value)}}
        /></div>
        <div>
        <button className="login-btn" onClick={signin}>Login</button>
        </div>

        

        <div>
        <button className="login-btn">GetUSer</button>
        </div>
   

<Link to = "/">Home</Link>
<Link to = "/signup">signup</Link>

 




    </div>
  )
}

export default Login