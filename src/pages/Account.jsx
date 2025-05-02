import { useEffect, useState } from "react";
import {
  User,
  Package,
  Grid,
  LayoutDashboard,
  Loader2,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
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

const AccountPage = () => {
  const [photoURL, setPhotoURL] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState();

  const [categories, setCategories] = useState([]);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("user_id", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserData(userData);
        }

        // Fetch categories for business users
        if (currentUser) {
          const catRef = collection(db, "categories");
          const cats = await getDocs(catRef);
          const catData = cats.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCategories(catData);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    type: "",
    id: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showStripeModal, setShowStripeModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Add a new state for the product edit modal and selected product
  const [editProductModal, setEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        console.log(authUser);
        setPhotoURL(authUser.photoURL);
        await fetchUser(authUser.uid);
        await fetchUserProducts(authUser.uid);
        await fetchUserOrders(authUser.uid);
        await fetchUsers();
        await fetchCategories();
      } else {
        setUserData(null);
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserProducts = async (id) => {
    try {
      const userRef = collection(db, "Product");
      const q = query(userRef);
      const querySnapshot = await getDocs(q);

      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const userRef = collection(db, "Users");
      const q = query(userRef);
      const querySnapshot = await getDocs(q);

      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(userData);

      setUsersData(userData);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  const fetchUserOrders = async (id) => {
    console.log("this is the user id" + id);
    try {
      const userRef = collection(db, "Orders");
      const q = query(userRef, where("CustomerID", "==", id));
      const querySnapshot = await getDocs(q);

      const ordersData = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  const fetchUser = async (id) => {
    console.log("this is the user id" + id);
    try {
      const userRef = collection(db, "Users");
      const q = query(userRef, where("user_id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // set the id
        const usersData = doc.data();
        usersData["id"] = doc.id;
        setUserData(usersData);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const userRef = collection(db, "ProductsCategory");
      const q = query(userRef);
      const querySnapshot = await getDocs(q);

      const categoriesData = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        categoriesData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCategories(categoriesData);
      console.log("Categories", categoriesData);
    } catch (error) {
      console.error("Error fetching categories data:", error);
    }
  };

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

  const handleUpdateUser = async (updatedUser) => {
    console.log("user to update", updatedUser);
    console.log("user to update id ", selectedUser.id || userData.id);

    try {
      // Update the user in Firestore
      const userRef = doc(db, "Users", selectedUser.id || userData.id);
      await updateDoc(userRef, updatedUser);

      // Update the local state
      setUserData(
        userData.map((user) =>
          user.id === selectedUser.id ? { ...user, ...updatedUser } : user
        )
      );

      // Close the modal
      setEditUserModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
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
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.ProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.ProductDescription?.toLowerCase().includes(
        searchTerm.toLowerCase()
      )
  );

  const filteredCategories = categories.filter(
    (category) => category?.owner === userData.user_id
  );

  //console.log("userid ", userData.user_id);
  console.log("filtered", filteredCategories);

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

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">No User Found</h2>
          <p className="text-gray-600">Please log in to access your account.</p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleViewOrder = (id) => {
    console.log("View category with ID:", id);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "N/A";
    return `KSH ${Number(amount).toLocaleString()}`;
  };
  const navigation = [
    {
      name: "Overview",
      tab: "overview",
      icon: LayoutDashboard,
      role: ["admin", "business", "customer"],
    },

    {
      name: "Products",
      tab: "products",
      icon: ShoppingBag,
      role: ["admin", "business"],
    },
    {
      name: "Orders",
      tab: "orders",
      icon: Package,
      role: ["admin", "customer"],
    },
    {
      name: "Business Orders",
      tab: "business-orders",
      icon: Package,
      role: ["admin", "business"],
    },
    {
      name: "Categories",
      tab: "categories",
      icon: Grid,
      role: ["admin", "business"],
    },
    {
      name: "Profile",
      tab: "profile",
      icon: User,
      role: ["admin", "business", "customer"],
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <CategoriesTab
            user={userData}
            orders={orders}
            formatCurrency={formatCurrency}
            handleEditUser={handleEditUser}
            products={products}
            categories={filteredCategories}
          />
        );
      case "orders":
        return <div>Orders Content</div>;
      case "business-orders":
        return <div>Business Orders Content</div>;
      case "categories":
        return <div>Categories Content</div>;
      case "business-categories":
        return <div>Business Category</div>;
      case "profile":
        return <div>Profile Content</div>;
      case "products":
        return (
          <ProductsTab
            formatCurrency={formatCurrency}
            searchTerm={searchTerm}
            handleEditProduct={handleEditProduct}
            handleDeleteItem={handleDeleteItem}
            products={filteredProducts}
          />
        );
      default:
        return <div>Unknown Tab</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
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
