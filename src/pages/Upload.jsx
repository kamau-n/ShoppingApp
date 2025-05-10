import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    desc: "",
    meal_type: "",
    category: "",
    featured: false,
  });
  const [response, setResponse] = useState("");
  const [proCategory, setProCategory] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [userId, setUserID] = useState(null);
  const [businessUrl, setBusinessUrl] = useState(null);

  const auth = getAuth();

  const fetchProducts = async () => {
    if (!userId) return;

    const catRef = collection(db, "ProductsCategory");
    const q = query(catRef, where("owner", "==", userId));

    try {
      const querySnapshot = await getDocs(q);
      const catD = [];
      querySnapshot.forEach((doc) => {
        catD.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProCategory(catD);
      console.log("Fetched categories:", catD);
    } catch (error) {
      console.error("Error fetching product categories:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserID(user.uid);
        // Fetch business URL
        const businessRef = collection(db, "business_profiles");
        const businessQuery = query(
          businessRef,
          where("user_id", "==", user.uid)
        );
        const businessSnapshot = await getDocs(businessQuery);

        if (!businessSnapshot.empty) {
          const businessData = businessSnapshot.docs[0].data();
          setBusinessUrl(businessData.business_url);
        }
      } else {
        setUserID(null);
        setBusinessUrl(null);
        setProCategory([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (userId) {
      fetchProducts();
    }
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (url) => {
    try {
      await addDoc(collection(db, "Product"), {
        Name: inputs.name,
        Price: Number(inputs.price),
        Link: url,
        Category: inputs.meal_type,
        Description: inputs.desc,
        owner: userId,
        featured: inputs.featured,
      });

      setResponse("Product successfully uploaded");
      setInputs({ name: "", price: "", desc: "", meal_type: "" });
      setFile(null);
      setProgress(0);
      setIsUploading(false);

      // Redirect to business page
      if (businessUrl) {
        navigate(`/business/${businessUrl}`);
      }
    } catch (error) {
      setResponse("Upload failed. Please try again.");
      console.error(error);
    }
  };

  const fileUpload = () => {
    if (!userId) {
      setResponse("You must be logged in to upload products");
      return;
    }

    if (!file) {
      setResponse("No file selected");
      return;
    }

    if (!inputs.meal_type) {
      setResponse("Please select a category");
      return;
    }

    setIsUploading(true);
    const storageRef = ref(storage, `images/${file.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        setIsUploading(false);
        setResponse("Upload error: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleSubmit(url);
          setIsUploading(false);
        });
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNav />
      <div className="flex-1 container max-w-3xl mx-auto py-10 px-4">
        {/* Main Card Container */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Add Product </h2>
            <p className="text-gray-600 mt-1">Create a new product</p>
          </div>

          {/* Alert Messages */}
          {response && (
            <div className="mb-6 p-4 rounded-lg flex items-center bg-green-50 text-green-700 border border-green-200">
              <span className="text-sm">{response}</span>
            </div>
          )}

          {/* Form Content */}
          <div className="space-y-6">
            {/* Category Type Select */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2">
                Category Type
              </label>
              <select
                id="type"
                name="meal_type"
                value={inputs.meal_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <option value="">Select A Product Category</option>
                {proCategory.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2">
                Product Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={inputs.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={inputs.desc}
                onChange={handleChange}
                placeholder="Product description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2">
                Featured Product?
              </label>
              <select
                id="type"
                name="featured"
                value={inputs.featured}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>

            {/* File Upload Section */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {file && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file: {file.name}
                </p>
              )}
            </div>

            {/* Progress Bar */}
            {progress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Upload Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={fileUpload}
              disabled={isUploading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
                ${
                  isUploading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}>
              {isUploading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </div>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upload;
