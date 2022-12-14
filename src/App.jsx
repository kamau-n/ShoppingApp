
import { useState ,useEffect} from 'react';
import {getDownloadURL, ref,uploadBytesResumable,listAll} from "firebase/storage"
import './App.css';
import {db,storage} from './config'
import  {collection,getDocs,addDoc ,doc,deleteDoc} from 'firebase/firestore';
//import Products from './assets/Assests'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Products  from './Products';
import Upload from './Upload';
import Login from './Login';
import Order from './Order';
import Sign from './Sign';
import Test from './Test'



function App() {






  return (
 
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products/>} />
        <Route path="/uploads" element={<Upload/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/orders" element={<Order/>} />
        <Route path="/signup" element={<Sign/>} />
        <Route path="/test" element={<Test/>} />

      </Routes>



      </BrowserRouter> 

     
 


 

   </div> 

   )
 }

   
   
  


  


    
    
 

export default App;
