import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/config";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import OverviewTab from "../components/tabs/OverViewTable";
//import SidesBar from "../components/layout/sidebar";
import Sidesbar from "../components/layout/sidebar";
import CategoriesTab from "../components/tabs/CategoriesTab";
import ProductsTab from "../components/tabs/ProductsTab";
import OrdersTab from "../components/tabs/OrdersTab";
import SubscriptionsTab from "../components/tabs/SubscriptionTab";
import UsersTab from "../components/tabs/UsersTab";
import ProductEditModal from "../components/modals/ProductEditModal";
import UserEditModal from "../components/modals/UserEditModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import SettingsTab from "../components/tabs/SettingsTab";
import BusinessProfileTab from "../components/tabs/BusinessProfilesPage";
import BsProfileEditModal from "../components/modals/BsProfileEditModal";
import MyBusinessProfileTab from "../components/tabs/MyBusinessProfileTab";
import {
  fetchBusinessProfiles,
  fetchCategories,
  fetchSubscriptions,
  fetchUserOrders,
  fetchUserProducts,
  fetchUsers,
} from "../helpers/firebaseFetchHelpers";
import navigation from "../utils/data/navigations";

const AccountPage = () => {
  const [photoURL, setPhotoURL] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState();
  const [businessProfiles, setBusinessProfile] = useState([]);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBsProfile, setEditBsProfile] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    type: "",
    id: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [subScriptions, setSubscriptions] = useState([]);
  const [myProfile, setMyProfile] = useState();

  // Add a new state for the product edit modal and selected product
  const [editProductModal, setEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [categories, setCategories] = useState([]);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("this is the current user", currentUser.uid);
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("user_id", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        if (!querySnapshot.empty) {
          console.log("am not empty");
          const userData = querySnapshot.docs[0].data();
          setUserData(userData);
        }

        console.log("this is the set user data", userData);

        // Fetch categories for business users
        // if (currentUser) {
        //   const catRef = collection(db, "categories");
        //   const cats = await getDocs(catRef);
        //   const catData = cats.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data(),
        //   }));
        //   setCategories(catData);
        // }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userData) return;
      const users = await fetchUsers();
      setUsersData(users);

      const cats = await fetchCategories();
      setCategories(cats);

      // const orders = await fetchUserOrders(userData.id);
      // setOrders(orders);

      const products = await fetchUserProducts();
      setProducts(products);

      const subs = await fetchSubscriptions();
      setSubscriptions(subs);

      const businesses = await fetchBusinessProfiles();
      setBusinessProfile(businesses);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData && businessProfiles.length > 0) {
      const myProf = businessProfiles.filter(
        (prof) => prof.user_id === userData.id
      );
      setMyProfile(myProf);
    }
  }, [userData, businessProfiles]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        console.log(authUser);
        setPhotoURL(authUser.photoURL);
      } else {
        setUserData(null);
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDeleteItem = async (type, id) => {
    try {
      const collectionName = type === "product" ? "Product" : "Orders";
      await deleteDoc(doc(db, collectionName, id));

      if (type === "product") {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        setOrders(orders.filter((order) => order.id !== id));
      }

      setDeleteConfirm({ show: false, type: "", id: "" });
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  // Update the handleEditProduct function to open the modal instead of navigating
  const handleEditProduct = (id) => {
    const product = products.find((p) => p.id === id);
    setSelectedProduct(product);
    setEditProductModal(true);
  };

  // const handleViewOrder = (id) => {
  //   navigate(`/order-details/${id}`);
  // };

  const handleEditUser = (user) => {
    console.log("I have been clicked");
    console.log("this is the selected user: ", user);
    setSelectedUser(user);
    setEditUserModal(true);
  };

  const handleEditBusinessProfile = (prof) => {
    setSelectedProfile(prof);
    setEditBsProfile(true);
  };
  const handleUpdateUser = async (updatedUser) => {
    try {
      // Update the user in Firestore
      const userRef = doc(db, "Users", selectedUser.id || userData.id);
      await updateDoc(userRef, updatedUser);

      // Update the local state
      // setUserData(
      //   userData.map((user) =>
      //     user.id === selectedUser.id ? { ...user, ...updatedUser } : user
      //   )
      // );

      // Close the modal
      setEditUserModal(false);
      setSelectedUser(null);
      navigate("/account");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUpdateBSProfile = async (updatedProfile) => {
    try {
      console.log("this is the profile to update", selectedProfile);
      const profRef = doc(db, "business_profiles", selectedProfile.id);
      await updateDoc(profRef, updatedProfile);
      setEditBsProfile(false);
      setSelectedProfile(null);
      navigate("/account");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Add a function to handle product updates
  const handleUpdateProduct = async (updatedProduct, imageFile) => {
    try {
      // Update the product in Firestore
      const productRef = doc(db, "Product", selectedProduct.id);

      // If there's a new image file, handle the upload
      if (imageFile && imageFile !== selectedProduct.Link) {
        // In a real implementation, you would upload the image to storage
        // and get the URL back. This is a simplified example.
        console.log("Would upload new image:", imageFile);
        // updatedProduct.Link = newImageUrl
      }

      await updateDoc(productRef, updatedProduct);

      // Update the local state
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, ...updatedProduct }
            : product
        )
      );

      // Close the modal
      setEditProductModal(false);
      setSelectedProduct(null);
      navigate("/account");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  let filteredCategories = [];

  console.log("This is the user data", categories);
  if (Boolean(userData)) {
    filteredCategories = categories.filter(
      (category) => category?.owner === userData.user_id
    );
  }

  console.log("this are filtered categories", filteredCategories);

  const businessProducts = products.filter((product) =>
    filteredCategories.some((category) => category.id === product.Category)
  );

  const filteredOrders = orders.filter(
    (order) =>
      order.OrderID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.Status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  // if (!userData) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="text-center space-y-4">
  //         <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
  //         <h2 className="text-xl font-semibold text-gray-900">No User Found</h2>
  //         <p className="text-gray-600">Please log in to access your account.</p>
  //         <Link
  //           to="/login"
  //           className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
  //           Go to Login
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  const handleViewOrder = (id) => {
    console.log("View category with ID:", id);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "N/A";
    return `KSH ${Number(amount).toLocaleString()}`;
  };

  const formatDate = (date) => {
    return date;
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            formatCurrency={formatCurrency}
            handleEditUser={handleEditUser}
            userData={usersData}
            user={userData}
            orders={orders}
            products={products}
            subscriptions={subScriptions}
            businessProfiles={businessProfiles}
          />
        );

      case "users":
        return (
          <UsersTab
            handleEditUser={handleEditUser}
            userData={usersData}
            setDeleteConfirm={setDeleteConfirm}
            searchTerm={searchTerm}
          />
        );
      case "orders":
        return (
          <OrdersTab
            formatDate={formatDate}
            formatCurrency={formatCurrency}
            handleViewOrder={handleViewOrder}
            orders={userData?.user_role == "admin" ? orders : filteredOrders}
            searchTerm={searchTerm}
            setDeleteConfirm={setDeleteConfirm}
          />
        );

      case "categories":
        return (
          <CategoriesTab
            categories={
              userData.user_role === "admin" ? categories : filteredCategories
            }
            handleViewOrder={handleViewOrder}
            searchTerm={searchTerm}
            setDeleteConfirm={setDeleteConfirm}
          />
        );

      case "subscriptions":
        return (
          <SubscriptionsTab
            handleViewSubscription={() => {}}
            searchTerm={searchTerm}
            setDeleteConfirm={setDeleteConfirm}
            subscriptions={subScriptions}
            setSearchTerm={searchTerm}
          />
        );
      case "products":
        return (
          <ProductsTab
            formatCurrency={formatCurrency}
            searchTerm={searchTerm}
            handleEditProduct={handleEditProduct}
            handleDeleteItem={handleDeleteItem}
            products={
              userData.user_role == "admin" ? products : businessProducts
            }
          />
        );

      case "businessprofiles":
        return (
          <BusinessProfileTab
            businessProfiles={businessProfiles}
            searchTerm={searchTerm}
            setDeleteConfirm={setDeleteConfirm}
            handleEdit={handleEditBusinessProfile}
          />
        );

      case "mybusinessprofile":
        return (
          <MyBusinessProfileTab
            myProfile={myProfile}
            handleEdit={handleEditBusinessProfile}
          />
        );

      case "settings":
        return <SettingsTab userData={userData} />;
      default:
        return <div>Unknown Tab</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {deleteConfirm.show && (
        <ConfirmationModal
          onCancel={setDeleteConfirm({
            show: false,
          })}
        />
      )}
      {editUserModal && (
        <UserEditModal
          onClose={() => {
            setEditUserModal(false);
          }}
          onUpdate={handleUpdateUser}
          user={selectedUser}
          userRole={userData.user_role}
        />
      )}

      {editBsProfile && (
        <BsProfileEditModal
          onClose={() => {
            setEditBsProfile(false);
          }}
          onUpdate={handleUpdateBSProfile}
          profile={selectedProfile}
        />
      )}

      {editProductModal && (
        <ProductEditModal
          onClose={() => {
            setEditProductModal(false);
          }}
          onUpdate={handleUpdateProduct}
          user={selectedProduct}
        />
      )}

      {showLogoutConfirm && (
        <ConfirmationModal
          message={"Are you sure you want to log out"}
          onConfirm={handleLogout}
          title={"Logout"}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}

      <Sidesbar
        user={userData}
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowLogoutConfirm={setShowLogoutConfirm}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default AccountPage;
