import React from "react";

function Account() {
  const customer = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St.",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    phone: "555-555-5555",
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold mb-2">Account Information</h3>
            <p className="text-gray-600 text-sm mb-2">
              Name: <span className="font-medium">{customer.name}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Email: <span className="font-medium">{customer.email}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Address: <span className="font-medium">{customer.address}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              City: <span className="font-medium">{customer.city}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              State: <span className="font-medium">{customer.state}</span>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              ZIP: <span className="font-medium">{customer.zip}</span>
            </p>
            <p className="text-gray-600 text-sm">
              Phone: <span className="font-medium">{customer.phone}</span>
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold mb-2">Order History</h3>
            <p className="text-gray-600 text-sm">
              You haven't placed any orders yet.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold mb-2">Account Settings</h3>
            <p className="text-gray-600 text-sm">
              You can update your account information here.
            </p>
            <button className="bg-purple-600 text-white font-bold py-2 px-4 mt-4 rounded">
              Update Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
