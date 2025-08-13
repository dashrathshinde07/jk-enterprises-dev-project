import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateProduct } from "../../api/productApi";
import { getAllCategories } from "../../api/categoryApi";
import { toast } from "react-toastify";

const ProductEdit = ({ data, onSuccess }) => {

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },    
    reset
  } = useForm({
    defaultValues: {
      nameEn: "",
      nameMr: "",
      slug: "",
      categoryId: "",
      productDescription: "",
      tags: "",
      searchableKeywords: "",
      sku: "",
      mrp: "",
      sellingPrice: "",
      brand: "",
      stock: "",
      warranty: "",
      dimensions: "",
      logisticsInfo: "",
      url: "",
      weightCapacity: "",
    }
  });

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data || res)
        if (data) {       
          if (data.category._id && res.data.length > 0) {         
            reset({ ...data, categoryId: data?.category?._id })
          } else {
            reset({ ...data })
          }         
        }
        setImages(data?.images || []);
      }
      )
      .catch(() => toast.error("Failed to load categories"));

  }, [data, reset]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onSubmit = async (formData) => {
    try {
      await updateProduct(data?._id, { ...formData, images });
      toast.success('✅ Product updated successfully!');
      onSuccess();
    } catch (error) {
      console.error("Error updating product:", error);
      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while updating the product.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Product Names Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Name</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name (English) *</label>
              <input
                type="text"
                {...register("nameEn", {
                  required: "English product name is required",
                  minLength: {
                    value: 3,
                    message: "Product name must be at least 3 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.nameEn ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter product name in english"
              />
              {errors.nameEn && (
                <p className="text-red-500 text-sm mt-1">{errors.nameEn.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product Name (मराठी) *</label>
              <input
                type="text"
                {...register("nameMr", {
                  required: "Marathi product name is required",
                  minLength: {
                    value: 3,
                    message: "Product name must be at least 3 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.nameMr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत उत्पादनाचे नाव टाका"
              />
              {errors.nameMr && (
                <p className="text-red-500 text-sm mt-1">{errors.nameMr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input
                type="text"
                {...register("slug", {
                  required: "Slug is required",
                  minLength: {
                    value: 3,
                    message: "Slug must be at least 3 characters long"
                  },
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: "Slug should only contain lowercase letters, numbers, and hyphens"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.slug ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="product-slug"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">SKU *</label>
              <input
                type="text"
                {...register("sku", {
                  required: "SKU is required",
                  minLength: {
                    value: 3,
                    message: "SKU must be at least 3 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.sku ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter SKU"
              />
              {errors.sku && (
                <p className="text-red-500 text-sm mt-1">{errors.sku.message}</p>
              )}
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              {...register("categoryId", {
                required: "Category is required"
              })}
              className={`w-full border rounded px-3 py-2 ${errors.categoryId ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <option value="">Select Category</option>
              {categories?.map((c) => (
                <option key={data?.category?._id} value={c?._id}>
                  {data?.category?.englishTitle}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
            )}
          </div> */}



          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              {...register("categoryId", {
                required: "Category is required"
              })}
              className={`w-full border rounded px-3 py-2 ${errors.categoryId ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c?._id}>
                  {c?.englishTitle}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
            )}
          </div>

        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Description</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              {...register("productDescription", {
                required: "Product description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters long"
                }
              })}
              rows={6}
              className={`w-full border rounded px-3 py-2 ${errors.productDescription ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter detailed product description"
            />
            {errors.productDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.productDescription.message}</p>
            )}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">MRP *</label>
              <input
                type="number"
                step="0.01"
                {...register("mrp", {
                  required: "MRP is required",
                  min: {
                    value: 0.01,
                    message: "MRP must be greater than 0"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.mrp ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="0.00"
              />
              {errors.mrp && (
                <p className="text-red-500 text-sm mt-1">{errors.mrp.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Selling Price *</label>
              <input
                type="number"
                step="0.01"
                {...register("sellingPrice", {
                  required: "Selling price is required",
                  min: {
                    value: 0.01,
                    message: "Selling price must be greater than 0"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="0.00"
              />
              {errors.sellingPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.sellingPrice.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Brand and Stock Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Brand & Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand *</label>
              <input
                type="text"
                {...register("brand", {
                  required: "Brand is required",
                  minLength: {
                    value: 2,
                    message: "Brand must be at least 2 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.brand ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter brand name"
              />
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock Quantity *</label>
              <input
                type="number"
                {...register("stock", {
                  required: "Stock quantity is required",
                  min: {
                    value: 0,
                    message: "Stock cannot be negative"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Warranty</label>
              <input
                type="text"
                {...register("warranty")}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="e.g., 1 year warranty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dimensions</label>
              <input
                type="text"
                {...register("dimensions")}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="e.g., 10x10x10 cm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Weight Capacity</label>
              <input
                type="text"
                {...register("weightCapacity")}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="e.g., 50 kg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product URL</label>
              <input
                type="url"
                {...register("url", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL starting with http:// or https://"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.url ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="https://example.com/product"
              />
              {errors.url && (
                <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Logistics Information</label>
            <textarea
              {...register("logisticsInfo")}
              rows={3}
              className="w-full border rounded px-3 py-2 border-gray-300"
              placeholder="Enter shipping and logistics information"
            />
          </div>
        </div>

        {/* Tags and Keywords Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">SEO & Tags</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <input
                type="text"
                {...register("tags")}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Searchable Keywords</label>
              <input
                type="text"
                {...register("searchableKeywords")}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Images</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Upload New Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border rounded px-3 py-2 border-gray-300"
            />
          </div>

          {/* Display existing images */}
          {data?.images?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Current Images:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 cursor-pointer text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium cursor-pointer ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;