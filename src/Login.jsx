import React from 'react'
import {Link} from 'react-router-dom'
//import {auth} from './config'
import {useState ,useEffect} from 'react';



import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";

const auth = getAuth();


//import firebase from 'firebase/compat/app';
//import * as firebaseui from 'firebaseui'
//import 'firebaseui/dist/firebaseui.css'

const Login = () => {
  const [useremail,setUseremail] = useState()
  const [password,setPassword] = useState()
  

const getuser =() =>{
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //console.log(user.uid)
      auth.currentUser
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}
  
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
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})


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
        <button className="login-btn" onClick={signin}>Continue</button>
        </div>

        <div>
        <button className="login-btn" onClick={getuser}>SignUp</button>
        </div>

        <div>
        <button className="login-btn">Use Facebook</button>
        </div>
        <div>
        <button className="login-btn">Use Twitter</button>
        </div>

<Link to = "/">Home</Link>

 




    </div>
  )
}

export default Login