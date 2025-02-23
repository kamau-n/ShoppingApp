import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
const auth = getAuth();

function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        fetchUser(authUser.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUser = async (id) => {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("user_id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">My Account</h2>
      {user ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Account Information</h3>
            <p><strong>Name:</strong> {user.user_first_name} {user.user_last_name}</p>
            <p><strong>Email:</strong> {user.user_email}</p>
            <p><strong>Address:</strong> {user.user_address}, {user.user_city}, {user.user_county}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Order History</h3>
            <p>You haven't placed any orders yet.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Account Settings</h3>
            <p>Update your account information here.</p>
            <button className="bg-purple-600 text-white font-bold py-2 px-4 mt-4 rounded hover:bg-purple-700">Update Account</button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Category Settings</h3>
            <p>Add or Delete a Category.</p>
            <Link to="/categories" >
            <button className="bg-purple-600 text-white font-bold py-2 px-4 mt-4 rounded hover:bg-purple-700">Add A Category</button>
           </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Add Products</h3>
            <p>Add or Delete A Product.</p>
            <Link to="/uploads" >
            <button className="bg-purple-600 text-white font-bold py-2 px-4 mt-4 rounded hover:bg-purple-700">Add A Product</button>
           </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading user data...</p>
      )}
    </div>
  );
}

export default Account;
