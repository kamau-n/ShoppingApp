import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Description } from "@material-ui/icons";
import TopNav from "../components/TopNav";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({ name: "", price: "", desc: "", meal_type: "" ,category:""});
  const [response, setResponse] = useState("");
  const [proCategory, setProCategory] = useState([]);
  const productsCollection = collection(db, "ProductsCategory");
  const uploadCollection = collection(db, "Product");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };



  const fetchProducts = async () => {
    const data = await getDocs(productsCollection);
    setProCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(proCategory);

  };
  const handleSubmit = async (url) => {
    console.log(inputs);
    try {
      await addDoc(uploadCollection, {
        Name: inputs.name,
        Price: inputs.price,
        Link: url,
        Category: inputs.meal_type,
        Description: inputs.desc,

      }).then((res) => {
        console.log("I have added the product");
        console.log(res);
      }
      )
      .catch((error) => console.error(error));  



      setResponse("Image successfully uploaded");
      setInputs({ name: "", price: "", rest: "", meal_type: "" }); // Clear inputs
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


  useEffect(() => {

    fetchProducts();
    
   
  }, []);

  return (
    <div className="bg-gray-100 w-3/4 mx-auto p-6 rounded-lg shadow-lg">
      <TopNav/>
      <h2 className="text-green-600 text-xl font-bold mb-3">{response}</h2>
      <h3 className="text-lg font-semibold mb-4">Upload a Product</h3>
      
      <select
        className="w-full p-2 border rounded mb-3"
        name="meal_type"
        value={inputs.meal_type}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        {proCategory.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
   
      </select>
      
      <input
        type="text"
        name="name"
        placeholder="Prduct  Name"
        className="w-full p-2 border rounded mb-3"
        value={inputs.name}
        onChange={handleChange}
      />
      
      <input
        type="text"
        name="price"
        placeholder="Product Price"
        className="w-full p-2 border rounded mb-3"
        value={inputs.price}
        onChange={handleChange}
      />
      
      <input
        type="text"
        name="desc"
        placeholder="Prodcut Description"
        className="w-full p-2 border rounded mb-3"
        value={inputs.desc}
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

export default Upload;
