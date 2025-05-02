import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/config";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import DisplayFood from "../components/displayFood";
import { Building2, ChevronRight, Package, Star } from "lucide-react";

const BusinessProducts = () => {
  const { businessUrl } = useParams();
  const [products, setProducts] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

        // fetch their categories

        const catRef = collection(db, "ProductsCategory");
        const catQuery = query(
          catRef,
          where("owner", "==", businessData.user_id)
        );

        const catSnapSnapshot = await getDocs(catQuery);
        const catData = catSnapSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(catData);

        console.log("Categories", categoryData);

        // Then get their products
        const productsRef = collection(db, "Product");
        const productsQuery = query(
          productsRef,
          where("business_id", "==", businessSnapshot.docs[0].id)
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
        {/* Business Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {business.business_name}
                </h1>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-gray-300 fill-current" />
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    4.0 (24 reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600">
              Welcome to our online store. Browse through our collection of
              quality products.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            {/* <button
              onClick={() => navigate("/categories")}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </button> */}
          </div>
          {/* {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse h-64 rounded-2xl"></div>
              ))}
            </div>
          ) */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categoryData.map((category, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate("/product", { state: { type: category.id } })
                }
                className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${category.image || ""})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {category.name}
                  </h3>
                  <button className="flex items-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg">
                    Shop Now
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        {/* {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600">
              This business hasn't added any products yet.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Available Products
            </h2>
            <DisplayFood data={products} type="Products" />
          </div>
        )} */}
      </main>

      <Footer />
    </div>
  );
};

export default BusinessProducts;
