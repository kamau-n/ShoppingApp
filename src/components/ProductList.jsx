import { ProductCard } from "./ProductCard";

export const ProductList = ({ fMeals, navigate }) => {
    console.log(fMeals);
    if (!Array.isArray(fMeals)) {
      console.error("fMeals is not an array:", fMeals);
      return <p>Loading meals...</p>;
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {fMeals.map((product) => (
          <ProductCard key={product.id} product={product} navigate={navigate} />
        ))}
      </div>
    );
  };