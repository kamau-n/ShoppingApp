export const ProductCard = ({ product, navigate }) => {
  return (
    <div
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden rounded-t-xl aspect-square">
        <img
          src={product.Link}
          alt={product.Name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>
      <div className="p-5">
        <h2 className="font-semibold text-lg text-gray-800 line-clamp-2 min-h-[3.5rem] mb-4">
          {product.Name}
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Price</span>
            <span className="text-xl font-bold text-gray-900 block">
              KSH {product.Price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transform transition-all duration-300 hover:bg-blue-700 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};