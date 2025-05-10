import { useState } from "react";
import { Camera, Package } from "lucide-react";
import { db } from "../../config/config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RegisterBusinessModal = ({ onClose, userData }) => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const businessName = formData.get("name");
    await addDoc(collection(db, "business_profiles"), {
      user_id: userData.id,
      business_name: businessName,
      subscription_status: "pending",
      business_url: businessName.toLowerCase().replace(/\s+/g, "-"),
      created_at: new Date(),
    });

    userData.user_role = "business";

    const updatedUser = userData;

    console.log(updatedUser);

    const userRef = doc(db, "Users", userData.id);
    await updateDoc(userRef, updatedUser);

    navigate("/business-payment");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Create Business Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterBusinessModal;
