import { useState } from "react";
import { Camera, Package } from "lucide-react";

const ProductEditModal = ({ product, onClose, onUpdate }) => {
  const [previewImage, setPreviewImage] = useState(product.Link || null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProduct = {
      Name: formData.get("name"),
      Price: parseFloat(formData.get("price")),
      ProductQuantity: parseInt(formData.get("quantity")),
      Category: formData.get("category"),
      Description: formData.get("description"),
    };

    const imageFile = formData.get("imageUrl");
    onUpdate(updatedProduct, imageFile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col items-center">
            <div className="w-32 h-32 rounded-md bg-gray-200 mb-2 overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt={product.Name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-12 h-12 m-10 text-gray-400" />
              )}
            </div>
            <label
              htmlFor="imageUrl"
              className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer">
              <Camera className="w-4 h-4 mr-1" />
              Change Image
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setPreviewImage(event.target.result);
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={product.Name || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                defaultValue={product.Price || 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                defaultValue={product.ProductQuantity || 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              defaultValue={product.Category || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={product.Description || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
