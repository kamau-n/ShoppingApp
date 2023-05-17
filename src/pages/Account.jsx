import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/config";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
const auth = getAuth();

function Account() {
  const [user, setUser] = useState({});

  const userLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user.uid);
        // console.log(user);
        // console.log(user.uid);
      } else {
      }
    });
  };
  const getUser = async (id) => {
    const userRef = collection(db, "Users");

    const q = query(collection(db, "Users"), where("user_id", "==", id));

    console.log("getting users");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUser(doc.data());
    });
  };

  useEffect(() => {
    userLogin();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold mb-2">Account Information</h3>
            <p className="text-gray-600 text-sm mb-2">
              Name:{" "}
              <span className="font-medium">
                {user.user_first_name} {user.user_last_name}
              </span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Email: <span className="font-medium">{user.user_email}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Address: <span className="font-medium">{user.user_address}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              City: <span className="font-medium">{user.user_city}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              County: <span className="font-medium">{user.user_county}</span>
            </p>

            <p className="text-gray-600 text-sm">
              Phone: <span className="font-medium">{user.phoneNumber}</span>
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold mb-2">Order History</h3>
            <p className="text-gray-600 text-sm">
              You haven't placed any orders yet.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold mb-2">Account Settings</h3>
            <p className="text-gray-600 text-sm">
              You can update your account information here.
            </p>
            <button className="bg-purple-600 text-white font-bold py-2 px-4 mt-4 rounded">
              Update Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
