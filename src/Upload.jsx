import React from "react";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import "./App.css";
import { db, storage } from "./config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Upload = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [rest, setRest] = useState();
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);
  const [url, setUrl] = useState();
  const [mealType, setMealType] = useState("");
  const [link, setLink] = useState();
  // const  mealCollection =  collection(db,"Meals")

  const handleSubmit = (ln) => {
    addDoc(collection(db, `${mealType}`), {
      Name: name,
      Price: price,
      Link: ln,
      Restaurant: rest,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submits = () => {
    fileUpload();
  };

  const fileUpload = () => {
    if (!file) return;
    const storageRef = ref(storage, `images/${File.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setLink(url);
          handleSubmit(url);
          console.log(link);
        });
      }
    );
  };

  return (
    <div className="main">
      <h2>Uploads</h2>
      <div className="">
        {/*<h3>Uploaded : {progress}</h3> */}

        <h3>Uploaded : {progress}</h3>

        <h3>Fill The form Below o upload Meal</h3>

        <div className="form">
          Select The type of Meal
          <select
            onChange={(e) => {
              setMealType(e.target.value);
              console.log(e.target.value);
            }}>
            <option value="Meals">Meal</option>
            <option value="Drinks">Drink</option>
          </select>
          <input
            type="text"
            placeholder="Enter the name of the Meal"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter the Price of the Meal"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter the name of the Restaurant"
            onChange={(e) => {
              setRest(e.target.value);
            }}
          />
          <input
            type="file"
            placeholder="Select a picture to upload"
            onChange={(e) => {
              setFile(e.target.files[0]);
              //console.log(file)
            }}
          />
          <button onClick={submits} className="btn">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
