// firebaseFetchHelpers.js

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/config";

export const fetchUser = async(id) => {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("user_id", "==", id));
    const querySnapshot = await getDocs(q);
    let userData = null;
    querySnapshot.forEach((doc) => {
        userData = { id: doc.id, ...doc.data() };
    });
    return userData;
};



export const fetchUsers = async() => {
    const q = query(collection(db, "Users"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};



export const fetchCategories = async() => {
    const q = query(collection(db, "ProductsCategory"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchUserOrders = async(userId) => {
    const q = query(collection(db, "Orders"), where("CustomerID", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchUserProducts = async() => {
    const q = query(collection(db, "Product"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchSubscriptions = async() => {
    const q = query(collection(db, "subscriptions"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchBusinessProfiles = async() => {
    const q = query(collection(db, "business_profiles"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};