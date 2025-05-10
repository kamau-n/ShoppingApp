"use client";

import { Link } from "react-router-dom";
import { Search, ShoppingBag, Eye, Trash2, Plus, Edit } from "lucide-react";

const MyBusinessProfileTab = ({ businessProfiles, myProfile, handleEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200  w-2/3 m-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">
            My Business Profiles
          </h3>
        </div>
      </div>

      {/* Always show "Add Categories" */}
      <div className="flex justify-end p-4 border-b">
        <button
          onClick={() => {
            handleEdit(myProfile);
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
          <Plus className="w-4 h-4 mr-2" />
          Edit My Profile
        </button>
      </div>

      {/* Empty State */}
      {businessProfiles?.length === 0 ? (
        <div className="p-8 text-center">
          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No Business Profiles Available.</p>
        </div>
      ) : (
        // Category Table
        <div className="overflow-x-auto"></div>
      )}
    </div>
  );
};

export default MyBusinessProfileTab;
