// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { createReview } from "../../api/reviewApi";

// const ReviewForm = ({ onSuccess }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       rating: 5,
//       reviewDate: new Date().toISOString().split('T')[0],
//       reviewText_en: "",
//       reviewText_mr: "",
//       file: null,
//     },
//   });

//   const currentRating = watch("rating");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setValue("file", file);

//       // Create preview for images
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setFilePreview(reader.result);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         setFilePreview(null);
//       }
//     }
//   };

//   const removeFile = () => {
//     setSelectedFile(null);
//     setFilePreview(null);
//     setValue("file", null);
//   };

//   const onSubmit = async (formData) => {
//     try {   
//       await createReview(formData);
//       onSuccess();
//     } catch (err) {
//       console.error("Failed to create review:", err);
//     }
//   };

//   const StarRating = ({ rating, onRatingChange, error }) => {
//     return (
//       <div className="flex flex-col">
//         <div className="flex items-center space-x-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               type="button"
//               onClick={() => onRatingChange(star)}
//               className={`text-2xl transition-colors duration-200 hover:scale-110 transform ${star <= rating ? "text-yellow-400" : "text-gray-300"
//                 }`}
//             >
//               ★
//             </button>
//           ))}
//           <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
//         </div>
//         {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4 bg-gray-50">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
//         <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Write a Review</h2>
//             <p className="text-gray-600">Share your experience with others</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Name Field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("name", {
//                   required: "Name is required",
//                   minLength: {
//                     value: 2,
//                     message: "Name must be at least 2 characters"
//                   }
//                 })}
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//               />
//               {errors.name && (
//                 <p className="text-sm text-red-600">{errors.name.message}</p>
//               )}
//             </div>

//             {/* Rating Field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Rating <span className="text-red-500">*</span>
//               </label>
//               <StarRating
//                 rating={currentRating}
//                 onRatingChange={(rating) => setValue("rating", rating)}
//                 error={errors.rating}
//               />
//               <input
//                 {...register("rating", {
//                   required: "Rating is required",
//                   min: { value: 1, message: "Rating must be at least 1" },
//                   max: { value: 5, message: "Rating cannot exceed 5" }
//                 })}
//                 type="hidden"
//               />
//             </div>

//             {/* Review Date Field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Review Date <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("reviewDate", {
//                   required: "Review date is required"
//                 })}
//                 type="date"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               />
//               {errors.reviewDate && (
//                 <p className="text-sm text-red-600">{errors.reviewDate.message}</p>
//               )}
//             </div>

//             {/* Review Text Section */}
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                 <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
//                 Review Text
//               </h3>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* English Review Text */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Review Text (English) <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     {...register("reviewText_en", {
//                       required: "English review text is required",
//                       minLength: {
//                         value: 10,
//                         message: "Review must be at least 10 characters"
//                       }
//                     })}
//                     rows={4}
//                     placeholder="Write your detailed review in English..."
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-vertical"
//                   />
//                   {errors.reviewText_en && (
//                     <p className="text-sm text-red-600">{errors.reviewText_en.message}</p>
//                   )}
//                 </div>

//                 {/* Marathi Review Text */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     पुनरावलोकन मजकूर (मराठी)
//                   </label>
//                   <textarea
//                     {...register("reviewText_mr")}
//                     rows={4}
//                     placeholder="मराठीत आपला तपशीलवार पुनरावलोकन लिहा..."
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-vertical"
//                   />
//                   {errors.reviewText_mr && (
//                     <p className="text-sm text-red-600">{errors.reviewText_mr.message}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* File Upload Section */}
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                 <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                 Upload File (Optional)
//               </h3>

//               <div className="space-y-4">
//                 {filePreview ? (
//                   <div className="relative group">
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//                       <img
//                         src={filePreview}
//                         alt="Preview"
//                         className="max-h-40 mx-auto object-contain"
//                       />
//                       <div className="mt-2 flex justify-between items-center">
//                         <span className="text-sm text-gray-600 truncate max-w-xs">
//                           {selectedFile.name}
//                         </span>
//                         <button
//                           type="button"
//                           onClick={removeFile}
//                           className="text-red-500 hover:text-red-700 text-sm font-medium"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ) : selectedFile ? (
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-600 truncate max-w-xs">
//                         {selectedFile.name}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={removeFile}
//                         className="text-red-500 hover:text-red-700 text-sm font-medium"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
//                         </svg>
//                         <p className="mb-2 text-sm text-gray-500">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500">PNG, JPG, PDF (MAX. 5MB)</p>
//                       </div>
//                       <input
//                         onChange={handleFileChange}
//                         type="file"
//                         className="hidden"
//                         accept="image/*,.pdf,.doc,.docx"
//                       />
//                     </label>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4 border-t border-gray-200">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting...
//                   </>
//                 ) : (
//                   "Submit Review"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewForm;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createReview } from "../../api/reviewApi";
import { toast } from "react-toastify";

const ReviewForm = ({ onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      rating: 5,
      reviewDate: new Date().toISOString().split('T')[0],
      reviewText_en: "",
      reviewText_mr: "",
      file: null,
    },
  });

  const currentRating = watch("rating");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setValue("file", file);

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setValue("file", null);
  };

  const onSubmit = async (formData) => {
    try {
      await createReview(formData);
      toast.success('✅ Review created successfully!');
      reset();
      setSelectedFile(null);
      setFilePreview(null);
      onSuccess();
    } catch (error) {
      console.error("Error creating review:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while creating the review.');
      }
    }
  };

  const StarRating = ({ rating, onRatingChange, error }) => {
    return (
      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className={`text-2xl transition-colors duration-200 hover:scale-110 transform ${star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Reviewer Details</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long"
                }
              })}
              className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Rating Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Rating</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Rating *</label>
            <StarRating
              rating={currentRating}
              onRatingChange={(rating) => setValue("rating", rating)}
              error={errors.rating}
            />
            <input
              {...register("rating", {
                required: "Rating is required",
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 5, message: "Rating cannot exceed 5" }
              })}
              type="hidden"
            />
          </div>
        </div>

        {/* Review Date Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Review Date</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Review Date *</label>
            <input
              type="date"
              {...register("reviewDate", {
                required: "Review date is required"
              })}
              className={`w-full border rounded px-3 py-2 ${errors.reviewDate ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.reviewDate && (
              <p className="text-red-500 text-sm mt-1">{errors.reviewDate.message}</p>
            )}
          </div>
        </div>

        {/* Review Text Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Review Text</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Review Text (English) *</label>
              <textarea
                {...register("reviewText_en", {
                  required: "English review text is required",
                  minLength: {
                    value: 10,
                    message: "Review must be at least 10 characters long"
                  }
                })}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.reviewText_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Write your detailed review in english"
              />
              {errors.reviewText_en && (
                <p className="text-red-500 text-sm mt-1">{errors.reviewText_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Review Text (मराठी)</label>
              <textarea
                {...register("reviewText_mr")}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.reviewText_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत आपला तपशीलवार पुनरावलोकन लिहा"
              />
              {errors.reviewText_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.reviewText_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Upload File (Optional)</h3>
          <div>
            {filePreview ? (
              <div className="relative group border border-gray-300 rounded p-4">
                <img
                  src={filePreview}
                  alt="Preview"
                  className="max-h-40 mx-auto object-contain"
                />
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-600 truncate max-w-xs">
                    {selectedFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : selectedFile ? (
              <div className="border border-gray-300 rounded p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 truncate max-w-xs">
                    {selectedFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF (MAX. 5MB)</p>
                  </div>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;