"use client";

import {
  ShoppingBag,
  CreditCard,
  Package,
  User2,
  Clock,
  Edit,
  ServerIcon,
  ScanFace,
} from "lucide-react";

const OverviewTab = ({
  user,
  orders,
  products,
  userData,
  formatCurrency,
  handleEditUser,
  subscriptions,
  businessProfiles,
}) => {
  const recentActivity = [
    { action: "Order Placed", date: "2 hours ago", amount: "KSH 2,500" },
    { action: "Profile Updated", date: "1 day ago" },
    { action: "New Category Added", date: "3 days ago" },
  ];

  return (
    <div className="space-y-6 w-2/3 m-auto">
      {/* Quick Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ShoppingBag className="w-12 h-12 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Orders
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {orders.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CreditCard className="w-12 h-12 text-green-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(
                  orders.reduce(
                    (total, order) => total + (Number(order.TotalAmount) || 0),
                    0
                  )
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Package className="w-12 h-12 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">My Products</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {products.length}
              </p>
            </div>
          </div>
        </div>

        {user.user_role === "admin" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <User2 className="w-12 h-12 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Users</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {userData.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {user.user_role === "admin" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <ServerIcon className="w-12 h-12 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Services</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {subscriptions.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {user.user_role === "admin" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <ScanFace className="w-12 h-12 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Business Profiles
                </h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {businessProfiles.length || 0}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                {activity.amount && (
                  <span className="text-sm font-medium text-gray-900">
                    {activity.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>
            <button
              className="text-blue-600 hover:text-blue-700 flex items-center"
              onClick={() => {
                console.log("Am to handle user editing");
                const userToEdit = { ...user, id: user.id };
                console.log(
                  "the is the logged in user to be editted",
                  userToEdit
                );
                handleEditUser(userToEdit);
              }}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="text-sm font-medium text-gray-900">
                {user.user_first_name} {user.user_last_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-900">
                {user.user_email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="text-sm font-medium text-gray-900">
                {user.phoneNumber || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="text-sm font-medium text-gray-900">
                {user.user_address
                  ? `${user.user_address}, ${user.user_city || ""}, ${
                      user.user_county || ""
                    }`
                  : "Not set"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
