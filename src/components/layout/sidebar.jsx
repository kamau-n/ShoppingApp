import { Link } from "react-router-dom";
import { User, Home, Camera, LogOut, X } from "lucide-react";

const Sidesbar = ({
  user,
  navigation,
  activeTab,
  setActiveTab,
  setShowLogoutConfirm,
  mobileMenuOpen,
  toggleMobileMenu,
}) => {
  return (
    <div
      className={`${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:flex md:flex-col md:w-64 md:fixed md:inset-y-0`}>
      {/* Close button - Only on mobile */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden absolute top-4 right-4 p-2 rounded-md text-gray-500 hover:bg-gray-100">
        <X className="h-5 w-5" />
      </button>

      <div className="flex flex-col flex-1 min-h-0 pt-5 md:pt-0">
        {/* Home link */}
        <div className="px-4 mb-4">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Profile */}
        <div className="flex-shrink-0 p-4 border-b">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 relative">
              {user?.user_image ? (
                <img
                  src={user?.user_image}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
              )}
              <button className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {/* {user?.user_first_name} {user?.user_last_name} */}
              </h2>
              <p className="text-sm text-gray-600">
                {user.user_email || "@gmail.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation
            ?.filter(
              (item) =>
                item.role === "all" || item.role.includes(user.user_role)
            )
            .map((item) => (
              <button
                key={item?.name}
                onClick={() => {
                  setActiveTab(item.tab);
                  if (mobileMenuOpen) toggleMobileMenu();
                }}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === item.tab
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}>
                <item.icon className="w-5 h-5 mr-3" />
                {item?.name}
              </button>
            ))}
        </nav>

        {/* Logout */}
        <div className="flex-shrink-0 p-4 border-t">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidesbar;
