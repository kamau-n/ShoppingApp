import React from "react";
// import Item from "../Item";
import { useState, useEffect } from "react";

import { db } from "../config/config";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signOut,
} from "firebase/auth";
import DisplayFood from "../components/displayFood";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";


const Product = () => {
  const [cart, setCart] = useState([]);

  const [data, setData] = useState([]);
  const { state } = useLocation();
  console.log(state);
  const [drinks, setDrinks] = useState([]);
  const [noOrder, setNoOrders] = useState(0);
  const [user, setUser] = useState();
  const [productsCollection, setProductsCollection] = useState();
  const selectedCategory = state?.type;
  const selectedCategoryCollection = collection(db, selectedCategory);


  

  // function allStorage() {
  //   var values = [],
  //     keys = Object.keys(localStorage),
  //     i = keys.length;

  //   while (i--) {
  //     values.push(localStorage.getItem(keys[i]));
  //   }

  //   return values;
  // }

  // create a firebase query to get the products depending on the category
  // get the category from the url
  // use the category to query the database
  // display the products
  // create a function to add to cart

  const fetchProducts = async () => {
    try {
      const q = query(
        collection(db, "Product"), // Ensure you're using the correct collection name
        where("Category", "==", selectedCategory)
      );
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(products); // Log the results
      setData(products); // Assuming you have a useState for products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  useEffect(() => {
    fetchProducts();
    // getDocs(q).then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //   })
  
    // })
    // .catch((error) => {
    //   console.log("Error getting documents: ", error);
    // });
      
 
  }, []);

  // const getDrink = () => {
  //   const getDrinks = async () => {
  //     const data = await getDocs(drinkCollection);
  //     setDrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getDrinks();
  // };

  // const listItem = () => {
  //   const getProducts = async () => {
  //     const data = await getDocs(mealCollection);
  //     setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     //console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
  //   };
  //   //getMeals();
  // };

  // const logout = () => {
  //   signOut(auth)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log("there was an error that occured");
  //       // An error happened.
  //     });
  // };

  // const listItem2 = () => {
  //   // getuser()
  //   const getDrinks = async () => {
  //     const data = await getDocs(drinkCollection);
  //     setDrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     //console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
  //   };
  //   getDrinks();
  // };

  return (
    <div>
      <TopNav />
      <main className=" w-11/12 p-2 my-3 mx-auto  bg-slate-200 ">
        <h5 className="uppercase text-xl my-5 py-3 text-center  font-bold">
          Available Items
        </h5>
        <DisplayFood data={data} type="Meals" />
      </main>
      <Footer />
    </div>
  );
};

export default Product;
