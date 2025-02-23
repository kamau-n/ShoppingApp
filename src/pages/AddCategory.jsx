import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Description } from "@material-ui/icons";
import TopNav from "../components/TopNav";

const AddCategory = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({ name: "", type: "", desc: ""});
  const [response, setResponse] = useState("");
  const [proCategory, setProCategory] = useState([]);
  const productsCollection = collection(db, "ProductsCategory");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };




  const handleSubmit = async (url) => {
    console.log(inputs);
    try {
      await addDoc(productsCollection, {
        name: inputs.name,
        type: inputs.type,
        image: url,


      }).then((res) => {
        console.log("I have added the category");
        console.log(res);
      }
      )
      .catch((error) => console.error(error));  



      setResponse("Image successfully uploaded");
      setInputs({ name: "", price: "",  type: "" }); // Clear inputs
      setFile(null);
      setProgress(0);
    } catch (error) {
      setResponse("Upload failed. Please try again.");
      console.error(error);
    }
  };

  const fileUpload = () => {
    console.log(inputs);
    if (!file) {
      setResponse("No file selected");
      return;
    }
    
    const storageRef = ref(storage, `images/${file.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => {
        setResponse("Upload error: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => handleSubmit(url));
      }
    );
  };


 

  return (
    <div className="bg-gray-100 w-3/4 mx-auto p-6 rounded-lg shadow-lg">
      <TopNav/>
      <h2 className="text-green-600 text-xl font-bold mb-3">{response}</h2>
      <h3 className="text-lg font-semibold mb-4">Add a Category</h3>
      
      <select
        className="w-full p-2 border rounded mb-3"
        name="type"
        value={inputs.type}
        onChange={handleChange}
      >
        <option value="">Select Type</option>
        <option value="product">Product</option>
        <option value="information">Information</option>
      </select>
      
      <input
        type="text"
        name="name"
        placeholder="Category  Name"
        className="w-full p-2 border rounded mb-3"
        value={inputs.name}
        onChange={handleChange}
      />
      
   
     
      
      <input
        type="file"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />
      
      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
          <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      
      <button
        onClick={fileUpload}
        className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default AddCategory
