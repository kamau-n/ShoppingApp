"use client";

import { CreditCard } from "lucide-react";
import { useState } from "react";
import RegisterBusinessModal from "../modals/RegisterBusinessModal";

const SettingsTab = ({ handleStripePayment, userData }) => {
  const [showRegisterModal, setRegisterModal] = useState(false);

  return (
    <div className="space-y-6 w-4/6 m-auto">
      {showRegisterModal && (
        <RegisterBusinessModal
          onClose={() => setRegisterModal(false)}
          userData={userData}
        />
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Account Settings
        </h3>
        <div className="space-y-4">
          {userData.user_role === "customer" && (
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Register Business
                </p>
                <p className="text-sm text-gray-500">Become a partner</p>
              </div>
              <button
                className="text-blue-600 hover:text-blue-700"
                onClick={() => {
                  console.log("Opening business modal", showRegisterModal);
                  setRegisterModal(true);
                }}>
                Register
              </button>
            </div>
          )}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Email Notifications
              </p>
              <p className="text-sm text-gray-500">
                Receive updates about your orders
              </p>
            </div>
            <button className="w-11 h-6 bg-gray-200 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span className="sr-only">Enable notifications</span>
              <span className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform duration-200 transform" />
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-gray-500">
                Add an extra layer of security
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-700">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Payment Methods
              </p>
              <p className="text-sm text-gray-500">
                Manage your payment options
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStripePayment(1000)}
                className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                Continue with Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
