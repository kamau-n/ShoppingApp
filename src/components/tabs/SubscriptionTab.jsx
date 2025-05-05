"use client";

import { Link } from "react-router-dom";
import { Search, Eye, Trash2, Plus, DollarSign } from "lucide-react";

const SubscriptionsTab = ({
  subscriptions,
  searchTerm,
  setSearchTerm,
  handleViewSubscription,
  setDeleteConfirm,
}) => {
  const filtered = subscriptions?.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-scroll w-2/3 m-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Subscriptions</h3>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search Subscriptions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4 border-b">
        <Link
          to="/subscriptions"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </Link>
      </div>

      {filtered?.length === 0 ? (
        <div className="p-8 text-center">
          <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No Subscriptions Available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price (Ksh)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Features
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {sub.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sub.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sub.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <ul className="list-disc ml-4">
                      {sub.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                      {sub.features.length > 2 && (
                        <li>+{sub.features.length - 2} more</li>
                      )}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewSubscription(sub)}
                        className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            show: true,
                            type: "subscription",
                            id: sub.id,
                          })
                        }
                        className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTab;
