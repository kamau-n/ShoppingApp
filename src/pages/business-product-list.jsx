import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/config";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import DisplayFood from "../components/displayFood";
import { Loader2, PackageSearch } from "lucide-react";

const BusinessProductList = () => {
  const { businessUrl } = useParams();
  const [products, setProducts] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessAndProducts = async () => {
      try {
        setLoading(true);
        // First get the business profile
        const businessRef = collection(db, "business_profiles");
        const businessQuery = query(
          businessRef,
          where("business_url", "==", businessUrl)
        );
        const businessSnapshot = await getDocs(businessQuery);

        if (businessSnapshot.empty) {
          setError("Business not found");
          setLoading(false);
          return;
        }

        const businessData = businessSnapshot.docs[0].data();
        setBusiness(businessData);

        // Then get their products
        const productsRef = collection(db, "Product");
        const productsQuery = query(
          productsRef,
          where("owner", "==", businessData.user_id)
        );
        const productsSnapshot = await getDocs(productsQuery);

        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching business data:", error);
        setError("Failed to load business products");
        setLoading(false);
      }
    };

    fetchBusinessAndProducts();
  }, [businessUrl]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <TopNav />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <TopNav />
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {business?.business_name} Products
          </h1>
          <p className="text-gray-600">
            Browse our selection of quality products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <PackageSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600">
              This business hasn't added any products yet.
            </p>
          </div>
        ) : (
          <DisplayFood data={products} type="Products" />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BusinessProductList;
