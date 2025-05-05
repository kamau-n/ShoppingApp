"use strict";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/config";
import { doc, setDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const SubscriptionForm = ({ subscription }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([""]);
  const navigate = useNavigate();

  useEffect(() => {
    if (subscription) {
      setName(subscription.name || "");
      setPrice(subscription.price || "");
      setFeatures(subscription.features || [""]);
    }
  }, [subscription]);

  const handleFeatureChange = (value, index) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setFeatures([""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: subscription?.id || name.toLowerCase().replace(/\s+/g, "-"),
      name,
      price: parseInt(price),
      features: features.filter((f) => f.trim() !== ""),
    };

    try {
      await setDoc(doc(db, "subscriptions", data.id), data);
      toast.success("Subscription saved successfully!");

      resetForm();
      setTimeout(() => navigate("/account"), 1000); // delay for toast to show
    } catch (error) {
      console.error("Error saving subscription:", error);
      toast.error("Failed to save subscription.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <Toaster position="top-right" />
      <h2 className="text-xl font-bold mb-4">
        {subscription ? "Edit Subscription" : "Add Subscription"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (Ksh)
          </label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(e.target.value, index)}
                className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-600 hover:text-red-800">
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-600 hover:underline mt-1">
            + Add Feature
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/account")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {subscription ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;
