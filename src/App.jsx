
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


function App() {






  return (
 
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products/>} />
        <Route path="/uploads" element={<Upload/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>



      </BrowserRouter>

     
 


 

   </div> 

   )
 }

   
   
  


  


    
    
 

export default App;
