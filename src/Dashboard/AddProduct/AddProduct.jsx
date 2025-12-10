import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    minOrder: "",
    payment: "",
    showHome: false,
    imageUrls: [], // store uploaded image URLs
  });
  const [images, setImages] = useState([]);
  const categories = ["T-Shirt", "Panjabi", "Hoodie", "Denim", "Women's Wear"];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle show on homepage
  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, showHome: !prev.showHome }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // Upload images to ImgBB
  const uploadImages = async () => {
    const uploadedUrls = [];
    for (const img of images) {
      const data = new FormData();
      data.append("image", img);

      try {
        const res = await axios.post(
          "https://api.imgbb.com/1/upload?key=c2caab6a740c87821a7d96195c7f7cf3",
          data
        );
        uploadedUrls.push(res.data.data.display_url);
      } catch (err) {
        toast.error("Failed to upload an image.");
      }
    }
    return uploadedUrls;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    const urls = await uploadImages();

    if (urls.length === 0) return;

    // Prepare final product data
    const productData = { ...formData, imageUrls: urls };

    try {
      await axios.post("http://localhost:5000/products", productData);
      toast.success("Product added successfully!");
      setFormData({
        productName: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        minOrder: "",
        payment: "",
        showHome: false,
        imageUrls: [],
      });
      setImages([]);
    } catch (err) {
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded h-24"
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price (৳)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Price"
            required
          />
        </div>

        {/* Available Quantity */}
        <div>
          <label className="block font-medium mb-1">Available Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Available stock"
            required
          />
        </div>

        {/* Minimum Order Quantity */}
        <div>
          <label className="block font-medium mb-1">Minimum Order Quantity</label>
          <input
            type="number"
            name="minOrder"
            value={formData.minOrder}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Minimum order amount"
            required
          />
        </div>

        {/* Payment Option */}
        <div>
          <label className="block font-medium mb-1">Payment Option</label>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Payment Type</option>
            <option value="payfirst">Pay First</option>
            <option value="cod">Cash On Delivery</option>
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium mb-1">Product Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />
          {images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-20 h-20 object-cover border rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Show on Homepage */}
        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={formData.showHome}
            onChange={handleToggle}
          />
          <label className="font-medium">Show on Homepage</label>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded w-full mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
