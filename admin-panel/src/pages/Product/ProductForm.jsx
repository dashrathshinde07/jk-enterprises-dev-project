// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { createProduct } from "../../api/productApi";
// import { getAllCategories } from "../../api/categoryApi";
// import { X, ChevronDown, ChevronRight } from "lucide-react";
// import LanguageTabs from "../../components/LanguageTabs";
// import { toast } from "react-toastify";

// const ProductForm = ({ onSuccess, onClose }) => {
//   const [lang, setLang] = useState("en");
//   const [images, setImages] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [expandedSections, setExpandedSections] = useState({
//     basic: true,
//     pricing: true,
//     details: true,
//     seo: true,
//     images: true
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting }
//   } = useForm({
//     defaultValues: {
//       nameEn: "",
//       nameMr: "",
//       slug: "",
//       categoryId: "",
//       productDescription: "",
//       tags: "",
//       searchableKeywords: "",
//       sku: "",
//       mrp: "",
//       sellingPrice: "",
//       brand: "",
//       stock: "",
//       warranty: "",
//       dimensions: "",
//       logisticsInfo: "",
//       url: "",
//       weightCapacity: "",
//     }
//   });

//   useEffect(() => {
//     getAllCategories().then((res) => setCategories(res.data || res));
//   }, []);

//   const handleImageChange = (e) => {
//     const newFiles = Array.from(e.target.files);
//     setImages(prev => [...prev, ...newFiles]);
//   };

//   const removeImage = (indexToRemove) => {
//     setImages(prev => prev.filter((_, index) => index !== indexToRemove));
//   };

//   const onSubmit = async (formData) => {

//     const toastId = toast.loading("Creating product...");
//     try {
//       await createProduct({ ...formData, images });

//       toast.update(toastId, {
//         render: "Product created successfully!",
//         type: "success",
//         isLoading: false,
//         autoClose: 3000,
//       });

//       onSuccess();
//     } catch (err) {
//       toast.update(toastId, {
//         render:
//           err?.response?.data?.message ||
//           err?.message ||
//           "Failed to create product.",
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     }
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const SectionHeader = ({ title, section, isExpanded }) => (
//     <button
//       type="button"
//       onClick={() => toggleSection(section)}
//       className="flex items-center justify-between w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
//     >
//       <h3 className="text-sm font-semibold text-[#2C498D]">{title}</h3>
//       {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
//     </button>
//   );

//   return (
//     <div className="max-w-3xl mx-auto p-4 bg-gray-50">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
//         {/* Header with Close Button */}
//         <div className="bg-gradient-to-r from-[#2C498D] to-[#1a3366] p-4 flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-bold text-white">Add New Product</h2>
//             <p className="text-blue-100 text-sm">Fill in the product details</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
//           {/* Language Tabs */}
//           <div className="bg-gray-50 p-3 rounded-lg">
//             <LanguageTabs lang={lang} setLang={setLang} />
//           </div>

//           {/* Basic Information Section */}
//           <div className="border rounded-lg">
//             <SectionHeader title="Basic Information" section="basic" isExpanded={expandedSections.basic} />
//             {expandedSections.basic && (
//               <div className="p-4 space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Product Name ({lang.toUpperCase()})
//                     </label>
//                     <input
//                       type="text"
//                       {...register(lang === "en" ? "nameEn" : "nameMr", {
//                         required: "Product name is required"
//                       })}
//                       placeholder={`Product name in ${lang === "en" ? "English" : "Marathi"}`}
//                       autoFocus
//                       className={`w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent ${errors[lang === "en" ? "nameEn" : "nameMr"] ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors[lang === "en" ? "nameEn" : "nameMr"] && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors[lang === "en" ? "nameEn" : "nameMr"]?.message}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Slug</label>
//                     <input
//                       type="text"
//                       {...register("slug", {
//                         required: "Slug is required",
//                         pattern: {
//                           value: /^[a-z0-9-]+$/,
//                           message: "Slug must contain only lowercase letters, numbers, and hyphens"
//                         }
//                       })}
//                       placeholder="product-url-slug"
//                       className={`w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent ${errors.slug ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors.slug && (
//                       <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
//                     <select
//                       {...register("categoryId", {
//                         required: "Category is required"
//                       })}
//                       className={`w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent ${errors.categoryId ? "border-red-500" : "border-gray-300"
//                         }`}
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((c) => (
//                         <option key={c._id} value={c._id}>
//                           {c?.englishTitle}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.categoryId && (
//                       <p className="text-xs text-red-500 mt-1">{errors.categoryId.message}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
//                     <input
//                       type="text"
//                       {...register("brand")}
//                       placeholder="Brand name"
//                       className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">Product Description</label>
//                   <textarea
//                     {...register("productDescription", {
//                       required: "Product description is required",
//                       minLength: {
//                         value: 10,
//                         message: "Description must be at least 10 characters"
//                       }
//                     })}
//                     placeholder="Detailed product description"
//                     rows={2}
//                     className={`w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent ${errors.productDescription ? "border-red-500" : "border-gray-300"
//                       }`}
//                   />
//                   {errors.productDescription && (
//                     <p className="text-xs text-red-500 mt-1">{errors.productDescription.message}</p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Pricing & Inventory Section */}
//           <div className="border rounded-lg">
//             <SectionHeader title="Pricing & Inventory" section="pricing" isExpanded={expandedSections.pricing} />
//             {expandedSections.pricing && (
//               <div className="p-4 space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">MRP</label>
//                     <input
//                       type="number"
//                       {...register("mrp", {
//                         required: "MRP is required",
//                         min: {
//                           value: 0,
//                           message: "MRP must be greater than 0"
//                         }
//                       })}
//                       placeholder="Max Price"
//                       className={`w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent ${errors.mrp ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors.mrp && (
//                       <p className="text-xs text-red-500 mt-1">{errors.mrp.message}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Selling Price</label>
//                     <input
//                       type="number"
//                       {...register("sellingPrice", {
//                         required: "Selling price is required",
//                         min: {
//                           value: 0,
//                           message: "Selling price must be greater than 0"
//                         }
//                       })}
//                       placeholder="Selling Price"
//                       className={`w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent ${errors.sellingPrice ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors.sellingPrice && (
//                       <p className="text-xs text-red-500 mt-1">{errors.sellingPrice.message}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Stock</label>
//                     <input
//                       type="number"
//                       {...register("stock", {
//                         required: "Stock quantity is required",
//                         min: {
//                           value: 0,
//                           message: "Stock must be 0 or greater"
//                         }
//                       })}
//                       placeholder="Stock Qty"
//                       className={`w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent ${errors.stock ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors.stock && (
//                       <p className="text-xs text-red-500 mt-1">{errors.stock.message}</p>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">SKU</label>
//                   <input
//                     type="text"
//                     {...register("sku", {
//                       required: "SKU is required"
//                     })}
//                     placeholder="Stock Keeping Unit"
//                     className={`w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent ${errors.sku ? "border-red-500" : "border-gray-300"
//                       }`}
//                   />
//                   {errors.sku && (
//                     <p className="text-xs text-red-500 mt-1">{errors.sku.message}</p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Product Details Section */}
//           <div className="border rounded-lg">
//             <SectionHeader title="Product Details" section="details" isExpanded={expandedSections.details} />
//             {expandedSections.details && (
//               <div className="p-4 space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Warranty</label>
//                     <input
//                       type="text"
//                       {...register("warranty")}
//                       placeholder="Warranty info"
//                       className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Weight Capacity</label>
//                     <input
//                       type="text"
//                       {...register("weightCapacity")}
//                       placeholder="Weight capacity"
//                       className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Dimensions</label>
//                     <input
//                       type="text"
//                       {...register("dimensions")}
//                       placeholder="Dimensions"
//                       className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Product URL</label>
//                     <input
//                       type="url"
//                       {...register("url", {
//                         pattern: {
//                           value: /^https?:\/\/.+/,
//                           message: "Please enter a valid URL"
//                         }
//                       })}
//                       placeholder="Product URL"
//                       className={`w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent ${errors.url ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors.url && (
//                       <p className="text-xs text-red-500 mt-1">{errors.url.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">Logistics Info</label>
//                   <textarea
//                     {...register("logisticsInfo")}
//                     placeholder="Shipping details"
//                     rows={2}
//                     className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* SEO & Tags Section */}
//           <div className="border rounded-lg">
//             <SectionHeader title="SEO & Tags" section="seo" isExpanded={expandedSections.seo} />
//             {expandedSections.seo && (
//               <div className="p-4 space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Tags</label>
//                     <input
//                       type="text"
//                       {...register("tags")}
//                       placeholder="tag1, tag2, tag3"
//                       className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Keywords</label>
//                     <input
//                       type="text"
//                       {...register("searchableKeywords")}
//                       placeholder="keyword1, keyword2"
//                       className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-[#2C498D] focus:border-transparent"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Images Section */}
//           <div className="border rounded-lg">
//             <SectionHeader title="Product Images" section="images" isExpanded={expandedSections.images} />
//             {expandedSections.images && (
//               <div className="p-4 space-y-4">
//                 <label className="block text-xs font-medium text-gray-700 mb-2">Upload Images</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#2C498D] transition-colors">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleImageChange}
//                     className="w-full text-sm"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Upload multiple images</p>
//                 </div>

//                 {/* Image Preview Section */}
//                 {images.length > 0 && (
//                   <div className="mt-4">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">
//                       Selected Images ({images.length})
//                     </h4>
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                       {images.map((image, index) => (
//                         <div key={index} className="relative group">
//                           <div className="aspect-square border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
//                             <img
//                               src={URL.createObjectURL(image)}
//                               alt={`Preview ${index + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
//                           >
//                             <X size={12} />
//                           </button>
//                           <p className="text-xs text-gray-500 mt-1 truncate">
//                             {image.name}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Submit Buttons */}
//           <div className="pt-4 border-t border-gray-200">
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`px-6 py-2 bg-[#2C498D] hover:bg-[#203c73] text-white rounded-md text-sm shadow-md hover:shadow-lg transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//                   }`}

//               >
//                 {isSubmitting ? "Saving..." : "Save Product"}
//                 Save Product
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../../api/productApi";
import { getAllCategories } from "../../api/categoryApi";
import { X } from "lucide-react";
// import LanguageTabs from "../../components/LanguageTabs";
import { toast } from "react-toastify";

const ProductForm = ({ onSuccess, onClose }) => {
  // const [lang, setLang] = useState("en");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
      .then((res) => setCategories(res.data || res))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages(prev => [...prev, ...newFiles]);
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = async (formData) => {
    try {
      await createProduct({ ...formData, images });
      toast.success('✅ Product created successfully!');
      reset();
      setImages([]);
      onSuccess();
    } catch (error) {
      console.error("Error creating product:", error);
      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while creating the product.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">     
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Name</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name (English) *</label>
              <input
                type="text"
                {...register("nameEn", {
                  required: "English name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long"
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
                  required: "Marathi name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long"
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
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: "Slug must contain only lowercase letters, numbers, and hyphens"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.slug ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="product-url-slug"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                {...register("categoryId", {
                  required: "Category is required"
                })}
                className={`w-full border rounded px-3 py-2 ${errors.categoryId ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c?.englishTitle}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input
                type="text"
                {...register("brand")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Brand name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">SKU *</label>
              <input
                type="text"
                {...register("sku", {
                  required: "SKU is required"
                })}
                className={`w-full border rounded px-3 py-2 ${errors.sku ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Stock keeping unit"
              />
              {errors.sku && (
                <p className="text-red-500 text-sm mt-1">{errors.sku.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Description *</label>
            <textarea
              {...register("productDescription", {
                required: "Product description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters long"
                },
                maxLength: {
                  value: 1000,
                  message: "Description must not exceed 1000 characters"
                }
              })}
              rows={4}
              className={`w-full border rounded px-3 py-2 ${errors.productDescription ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Detailed product description"
            />
            {errors.productDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.productDescription.message}</p>
            )}
          </div>
        </div>

        {/* Pricing & Inventory Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Pricing & Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">MRP *</label>
              <input
                type="number"
                {...register("mrp", {
                  required: "MRP is required",
                  min: {
                    value: 0,
                    message: "MRP must be greater than 0"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.mrp ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Maximum retail price"
              />
              {errors.mrp && (
                <p className="text-red-500 text-sm mt-1">{errors.mrp.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Selling Price *</label>
              <input
                type="number"
                {...register("sellingPrice", {
                  required: "Selling price is required",
                  min: {
                    value: 0,
                    message: "Selling price must be greater than 0"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Selling price"
              />
              {errors.sellingPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.sellingPrice.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock *</label>
              <input
                type="number"
                {...register("stock", {
                  required: "Stock quantity is required",
                  min: {
                    value: 0,
                    message: "Stock must be 0 or greater"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Stock quantity"
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
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Warranty information"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Weight Capacity</label>
              <input
                type="text"
                {...register("weightCapacity")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Weight capacity"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Dimensions</label>
              <input
                type="text"
                {...register("dimensions")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Product dimensions"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product URL</label>
              <input
                type="url"
                {...register("url", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL"
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
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Shipping and logistics details"
            />
          </div>
        </div>

        {/* SEO & Tags Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">SEO & Tags</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <input
                type="text"
                {...register("tags")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="tag1, tag2, tag3"
              />
              <p className="text-gray-500 text-xs mt-1">Separate tags with commas</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Search Keywords</label>
              <input
                type="text"
                {...register("searchableKeywords")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="keyword1, keyword2, keyword3"
              />
              <p className="text-gray-500 text-xs mt-1">Separate keywords with commas</p>
            </div>
          </div>
        </div>

        {/* Product Images Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Images</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-gray-500 text-xs mt-1">Select multiple images for the product</p>
          </div>

          {/* Image Preview Section */}
          {images.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Selected Images ({images.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border cursor-pointer border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 flex-1 rounded text-white font-medium cursor-pointer ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Creating Product...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;