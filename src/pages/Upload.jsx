import React from "react";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";

import { db, storage } from "../config/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Upload = () => {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);
  const [url, setUrl] = useState();
  const [inputs, setInputs] = useState({});

  const [link, setLink] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (ln) => {
    addDoc(collection(db, `${inputs.meal_type}`), {
      Name: inputs.name,
      Price: inputs.price,
      Link: ln,
      Restaurant: inputs.rest,
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
            onChange={handleChange}
            name="meal_type"
            value={inputs.meal_type || ""}>
            <option value="Meals">Meal</option>
            <option value="Drinks">Drink</option>
          </select>
          <input
            type="text"
            placeholder="Enter the name of the Meal"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter the Price of the Meal"
            name="price"
            value={inputs.price || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter the name of the Restaurant"
            name="rest"
            value={inputs.rest || ""}
            onChange={handleChange}
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
