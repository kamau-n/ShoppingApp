import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/config";
import { collection, addDoc } from "firebase/firestore";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AddCategory = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({ name: "", type: "" });
  const [response, setResponse] = useState({ message: "", type: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const productsCollection = collection(db, "ProductsCategory");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (url) => {
    try {
      await addDoc(productsCollection, {
        name: inputs.name,
        type: inputs.type,
        image: url,
        owner: user?.uid,
      });

      setResponse({
        message: "Category successfully added",
        type: "success",
      });
      setInputs({ name: "", type: "" });
      setFile(null);
      setProgress(0);
      setIsUploading(false);
    } catch (error) {
      setResponse({
        message: "Failed to add category. Please try again.",
        type: "error",
      });
      setIsUploading(false);
      console.error(error);
    }
  };

  const fileUpload = () => {
    // Form validation
    if (!inputs.name.trim()) {
      setResponse({ message: "Please enter a category name", type: "error" });
      return;
    }

    if (!inputs.type) {
      setResponse({ message: "Please select a category type", type: "error" });
      return;
    }

    if (!file) {
      setResponse({ message: "Please select an image file", type: "error" });
      return;
    }

    setIsUploading(true);
    setResponse({ message: "", type: "" });

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
        setResponse({
          message: "Upload error: " + error.message,
          type: "error",
        });
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          handleSubmit(url)
        );
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
            <h2 className="text-2xl font-bold text-gray-800">
              Add Product Category
            </h2>
            <p className="text-gray-600 mt-1">
              Create a new category for your products or information
            </p>
          </div>

          {/* Alert Messages */}
          {response.message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center ${
                response.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}>
              <span className="text-sm">{response.message}</span>
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
                name="type"
                value={inputs.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <option value="">Select Type</option>
                <option value="product">Product</option>
                <option value="information">Information</option>
              </select>
            </div>

            {/* Category Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="Enter category name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* File Upload Section */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2">
                Category Image
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
                "Add Category"
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCategory;
