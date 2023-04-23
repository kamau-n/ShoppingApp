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
import Uploaded from "../components/Uploaded";
import Form from "../components/Form";
import Pending from "../components/Pending";

const Upload = () => {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);

  const [inputs, setInputs] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(false);
  const [responses, setResponses] = useState();

  const [link, setLink] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (ln) => {
    console.log(inputs, file);
    addDoc(collection(db, `${inputs.meal_type}`), {
      Name: inputs.name,
      Price: inputs.price,
      Link: ln,
      Restaurant: inputs.rest,
    })
      .then((res) => {
        console.log(res);
        setResponses("Image successfully uploaded");
      })
      .catch((err) => {
        console.log(err);
        setResponses(err);
      });
  };

  const submits = () => {
    fileUpload();
  };

  const fileUpload = () => {
    console.log(inputs, file);
    if (!file) {
      setResponses("No File selected");
    } else {
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
          setResponses(err.msg);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setLink(url);
            handleSubmit(url);
            // console.log(link);
          });
        }
      );
    }
  };

  return (
    <div className="bg-slate-300 w-3/4 mx-auto py-5">
      <div className=" ">
        <div className="w-2/3 mx-auto py-5 px-6 bg-white ">
          <div className="my-4 mx-5">
            <h2 className="text-green-400 py-3 px-4 my-3 text-xl">
              {responses}
            </h2>
            <h3 className="uppercase text-xl font-mono font-semibold my-4 mx-4">
              A Form for uploading a product
            </h3>
            <select
              className=" px-4 text-l text-center  uppercase"
              name="meal_type"
              value={inputs.meal_type || ""}
              onChange={handleChange}>
              <option>Select Product Type</option>
              <option value="Meals">Normal Meal</option>
              <option value="Drinks">Normal Drink</option>
              <option value="Fdrinks">Feature Drink</option>
              <option value="Fmeals">Feature Meal</option>
            </select>
          </div>
          <div className="flex my-3  justify-between">
            <input
              type="text"
              placeholder="Enter the name of the Meal"
              className="px-2 py-5 text-xl text-center border-2"
              name="name"
              value={inputs.name || " "}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Enter the Price of the Meal"
              name="price"
              className="px-2 py-5 text-xl text-center border-2"
              value={inputs.price || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex my-3 justify-between">
            <input
              type="text"
              placeholder="Enter the name of the Restaurant"
              name="rest"
              className="px-2 py-5 text-xl text-center border-2"
              value={inputs.rest || ""}
              onChange={handleChange}
            />

            <input
              type="file"
              placeholder="Select a picture to upload"
              className="px-2 py-5 text-xl text-center border-2"
              onChange={(e) => {
                setFile(e.target.files[0]);
                //console.log(file)
              }}
            />
          </div>
          <button
            onClick={submits}
            className="py-3  my-4  rounded px-10 font-bold text-xl font-mono bg-orange-400">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
