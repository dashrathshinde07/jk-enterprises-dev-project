// import React, { useState } from "react";
// import { updateFooterById } from "../../api/footerApi";
// import ImageUploader from "../../components/ImageUploader";
// import LanguageTabs from "../../components/LanguageTabs";

// const FooterEdit = ({ data, onSuccess }) => {
//   const [form, setForm] = useState({
//     title_en: data.title_en || "",
//     title_mr: data.title_mr || "",
//     description_en: data.description_en || "",
//     description_mr: data.description_mr || "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (file) => {
//     setForm((prev) => ({ ...prev, image: file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateFooterById(data._id, form);
//       onSuccess();
//     } catch (err) {
//       console.error("Failed to update footer:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <LanguageTabs
//         tabs={[
//           {
//             label: "English",
//             content: (
//               <>
//                 <input
//                   type="text"
//                   name="title_en"
//                   value={form.title_en}
//                   onChange={handleChange}
//                   placeholder="Title (EN)"
//                   className="input"
//                   required
//                 />
//                 <textarea
//                   name="description_en"
//                   value={form.description_en}
//                   onChange={handleChange}
//                   placeholder="Description (EN)"
//                   className="textarea"
//                 />
//               </>
//             ),
//           },
//           {
//             label: "Marathi",
//             content: (
//               <>
//                 <input
//                   type="text"
//                   name="title_mr"
//                   value={form.title_mr}
//                   onChange={handleChange}
//                   placeholder="शीर्षक (MR)"
//                   className="input"
//                 />
//                 <textarea
//                   name="description_mr"
//                   value={form.description_mr}
//                   onChange={handleChange}
//                   placeholder="वर्णन (MR)"
//                   className="textarea"
//                 />
//               </>
//             ),
//           },
//         ]}
//       />

//       <ImageUploader
//         onChange={handleImageChange}
//         existingImage={data.image?.url}
//       />

//       <div className="flex justify-end">
//         <button type="submit" className="btn btn-primary">
//           Update Footer
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FooterEdit;

// import React, { useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { updateFooterById } from "../../api/footerApi";
// import LanguageTabs from "../../components/LanguageTabs";

// const FooterEdit = ({ data, onSuccess }) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { isSubmitting },
//   } = useForm({
//     defaultValues: {
//       description_en: "",
//       description_mr: "",
//       links: [{ label_en: "", label_mr: "", url: "" }],
//       phone_en: "",
//       phone_mr: "",
//       address_en: "",
//       address_mr: "",
//       facebook: "",
//       instagram: "",
//       linkedin: "",
//       developedBy: "",
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "links",
//   });

//   // Set default values using setValue
//   useEffect(() => {
//     if (data) {
//       setValue("description_en", data?.description?.en || "");
//       setValue("description_mr", data?.description?.mr || "");
//       setValue("links", data?.links || [{ label_en: "", label_mr: "", url: "" }]);
//       setValue("phone_en", data?.contact?.phone?.en || "");
//       setValue("phone_mr", data?.contact?.phone?.mr || "");
//       setValue("address_en", data?.contact?.address?.en || "");
//       setValue("address_mr", data?.contact?.address?.mr || "");
//       setValue("facebook", data?.socialLinks?.facebook || "");
//       setValue("instagram", data?.socialLinks?.instagram || "");
//       setValue("linkedin", data?.socialLinks?.linkedin || "");
//       setValue("developedBy", data?.developedBy || "");
//     }
//   }, [data, setValue]);

//   const onSubmit = async (formData) => {
//     try {
//       await updateFooterById(data._id, formData);
//       onSuccess();
//     } catch (err) {
//       console.error("Failed to update footer:", err);
//     }
//   };

//   const addLink = () => {
//     append({ label_en: "", label_mr: "", url: "" });
//   };

//   const removeLink = (index) => {
//     if (fields.length > 1) {
//       remove(index);
//     }
//   };

//   return (
//     // <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//     <div className="max-w-3xl mx-auto p-4 bg-gray-50">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Footer</h2>
//           <p className="text-gray-600">Update your footer content and settings</p>
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           {/* Description Section */}
//           <div className="bg-gray-50 p-6 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//               <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
//               Description
//             </h3>

//             <LanguageTabs
//               tabs={[
//                 {
//                   label: "English",
//                   content: (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Description (English)
//                       </label>
//                       <textarea
//                         {...register("description_en")}
//                         rows={4}
//                         placeholder="Enter footer description in English"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-vertical"
//                       />
//                     </div>
//                   ),
//                 },
//                 {
//                   label: "मराठी",
//                   content: (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         वर्णन (मराठी)
//                       </label>
//                       <textarea
//                         {...register("description_mr")}
//                         rows={4}
//                         placeholder="मराठीत फुटर वर्णन प्रविष्ट करा"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-vertical"
//                       />
//                     </div>
//                   ),
//                 },
//               ]}
//             />
//           </div>

//           {/* Footer Links Section */}
//           <div className="bg-gray-50 p-6 rounded-lg">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                 <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
//                 Footer Links
//               </h3>
//               <button
//                 type="button"
//                 onClick={addLink}
//                 className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
//               >
//                 + Add Link
//               </button>
//             </div>

//             <div className="space-y-4">
//               {fields.map((field, index) => (
//                 <div key={field.id} className="bg-white p-4 rounded-lg border border-gray-200">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-sm font-medium text-gray-700">Link {index + 1}</span>
//                     {fields.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeLink(index)}
//                         className="text-red-500 hover:text-red-700 transition-colors duration-200"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                         </svg>
//                       </button>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 mb-1">
//                         Label (English)
//                       </label>
//                       <input
//                         {...register(`links.${index}.label_en`)}
//                         type="text"
//                         placeholder="Link label in English"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 mb-1">
//                         लेबल (मराठी)
//                       </label>
//                       <input
//                         {...register(`links.${index}.label_mr`)}
//                         type="text"
//                         placeholder="मराठीत लिंक लेबल"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs font-medium text-gray-600 mb-1">
//                         URL
//                       </label>
//                       <input
//                         {...register(`links.${index}.url`)}
//                         type="url"
//                         placeholder="https://example.com"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Contact Information Section */}
//           <div className="bg-gray-50 p-6 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//               <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
//               Contact Information
//             </h3>

//             <LanguageTabs
//               tabs={[
//                 {
//                   label: "English",
//                   content: (
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Phone Number (English)
//                         </label>
//                         <input
//                           {...register("phone_en")}
//                           type="tel"
//                           placeholder="+91 12345 67890"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Address (English)
//                         </label>
//                         <textarea
//                           {...register("address_en")}
//                           rows={3}
//                           placeholder="Enter complete address in English"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-vertical"
//                         />
//                       </div>
//                     </div>
//                   ),
//                 },
//                 {
//                   label: "मराठी",
//                   content: (
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           फोन नंबर (मराठी)
//                         </label>
//                         <input
//                           {...register("phone_mr")}
//                           type="tel"
//                           placeholder="+९१ १२३४५ ६७८९०"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           पत्ता (मराठी)
//                         </label>
//                         <textarea
//                           {...register("address_mr")}
//                           rows={3}
//                           placeholder="मराठीत संपूर्ण पत्ता प्रविष्ट करा"
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-vertical"
//                         />
//                       </div>
//                     </div>
//                   ),
//                 },
//               ]}
//             />
//           </div>

//           {/* Social Media Links Section */}
//           <div className="bg-gray-50 p-6 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//               <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
//               Social Media Links
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <span className="flex items-center">
//                     <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//                     </svg>
//                     Facebook
//                   </span>
//                 </label>
//                 <input
//                   {...register("facebook")}
//                   type="url"
//                   placeholder="https://facebook.com/yourpage"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <span className="flex items-center">
//                     <svg className="w-4 h-4 mr-2 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                     </svg>
//                     Instagram
//                   </span>
//                 </label>
//                 <input
//                   {...register("instagram")}
//                   type="url"
//                   placeholder="https://instagram.com/yourprofile"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <span className="flex items-center">
//                     <svg className="w-4 h-4 mr-2 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                     </svg>
//                     LinkedIn
//                   </span>
//                 </label>
//                 <input
//                   {...register("linkedin")}
//                   type="url"
//                   placeholder="https://linkedin.com/in/yourprofile"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Developer Credit Section */}
//           <div className="bg-gray-50 p-6 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//               <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
//               Developer Credit
//             </h3>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Developed By
//               </label>
//               <input
//                 {...register("developedBy")}
//                 type="text"
//                 placeholder="Your Company Name or Developer Name"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end pt-6 border-t border-gray-200">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Updating...
//                 </>
//               ) : (
//                 "Update Footer"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>

//   );
// };

// export default FooterEdit;



import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { updateFooterById, createFooter } from "../../api/footerApi";
// import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const FooterEdit = ({ data, onSuccess }) => {
  // const [lang, setLang] = useState("mr");
  const [logo, setLogo] = useState(data?.logoUrl || null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      description_en: data?.description?.en || "",
      description_mr: data?.description?.mr || "",
      links: data?.links || [{ label_en: "", label_mr: "", url: "" }],
      phone_en: data?.contact?.phone?.en || "",
      phone_mr: data?.contact?.phone?.mr || "",
      address_en: data?.contact?.address?.en || "",
      address_mr: data?.contact?.address?.mr || "",
      facebook: data?.socialLinks?.facebook || "",
      instagram: data?.socialLinks?.instagram || "",
      linkedin: data?.socialLinks?.linkedin || "",
      developedBy: data?.developedBy || "",
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links"
  });

  useEffect(() => {
    if (data) {
      reset({
        description_en: data?.description?.en || "",
        description_mr: data?.description?.mr || "",
        links: data?.links || [{ label_en: "", label_mr: "", url: "" }],
        phone_en: data?.contact?.phone?.en || "",
        phone_mr: data?.contact?.phone?.mr || "",
        address_en: data?.contact?.address?.en || "",
        address_mr: data?.contact?.address?.mr || "",
        facebook: data?.socialLinks?.facebook || "",
        instagram: data?.socialLinks?.instagram || "",
        linkedin: data?.socialLinks?.linkedin || "",
        developedBy: data?.developedBy || "",
      });
      setLogo(data?.logoUrl || null);
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        description: {
          en: formData.description_en,
          mr: formData.description_mr,
        },
        contact: {
          address: {
            en: formData.address_en,
            mr: formData.address_mr,
          },
          phone: {
            en: formData.phone_en,
            mr: formData.phone_mr,
          }
        },
        socialLinks: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          linkedin: formData.linkedin,
        },
        links: formData.links.filter(link => link.label_en?.trim() || link?.label_mr?.trim() || link?.url?.trim()),
        developedBy: formData.developedBy,
        logoUrl: logo,
      };

      if (data?._id) {
        await updateFooterById(data?._id, payload);
        toast.success('✅ Footer updated successfully!');
      } else {
        await createFooter(payload);
        toast.success('✅ Footer created successfully!');
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving footer:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while saving the footer.');
      }
    }
  };

  const addLink = () => {
    append({ label_en: "", label_mr: "", url: "" });
  };

  const removeLink = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Language Tabs */}
        {/* <div className="flex justify-center">
          <LanguageTabs lang={lang} setLang={setLang} />
         </div> */}

        {/* Logo Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Logo</h3>
          <ImageUploader image={logo} setImage={setLogo} />
        </div>


        {/* Description Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Description</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Description (English) *</label>
              <textarea
                {...register("description_en", {
                  required: "English description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long"
                  }
                })}                
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.description_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter description in english"
              />
              {errors.description_en && (
                <p className="text-red-500 text-sm mt-1">{errors.description_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description (मराठी) *</label>
              <textarea
                {...register("description_mr", {
                  required: "Marathi description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long"
                  }
                })}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.description_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत वर्णन टाका"
              />
              {errors.description_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.description_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h3>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Address (English) *</label>
              <textarea
                {...register("address_en", {
                  required: "English address is required",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters long"
                  }
                })}
                rows={3}
                className={`w-full border rounded px-3 py-2 ${errors.address_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter address in english"
              />
              {errors.address_en && (
                <p className="text-red-500 text-sm mt-1">{errors.address_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address (मराठी) *</label>
              <textarea
                {...register("address_mr", {
                  required: "Marathi address is required",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters long"
                  }
                })}
                rows={3}
                className={`w-full border rounded px-3 py-2 ${errors.address_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत पत्ता टाका"
              />
              {errors.address_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.address_mr.message}</p>
              )}
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone (English) *</label>
              <input
                type="tel"
                {...register("phone_en", {
                  required: "English phone number is required",
                  pattern: {
                    value: /^\+?[0-9\s\-()]{10,}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                className={`w-full border rounded px-3 py-2 ${errors.phone_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter phone number"
              />
              {errors.phone_en && (
                <p className="text-red-500 text-sm mt-1">{errors.phone_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone (मराठी) *</label>
              <input
                type="text"
                {...register("phone_mr", {
                  required: "Marathi phone number is required"
                })}
                className={`w-full border rounded px-3 py-2 ${errors.phone_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत फोन नंबर टाका"
              />
              {errors.phone_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.phone_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Facebook</label>
              <input
                type="url"
                {...register("facebook", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL starting with http:// or https://"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.facebook ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="https://facebook.com/yourpage"
              />
              {errors.facebook && (
                <p className="text-red-500 text-sm mt-1">{errors.facebook.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Instagram</label>
              <input
                type="url"
                {...register("instagram", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL starting with http:// or https://"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.instagram ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="https://instagram.com/yourprofile"
              />
              {errors.instagram && (
                <p className="text-red-500 text-sm mt-1">{errors.instagram.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                type="url"
                {...register("linkedin", {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL starting with http:// or https://"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.linkedin ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="https://linkedin.com/company/yourcompany"
              />
              {errors.linkedin && (
                <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Footer Links</h3>
            <button
              type="button"
              onClick={addLink}
              className="bg-[#2C498D] hover:bg-[#1e3a7a] text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="bg-gray-50 p-4 rounded border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Link {index + 1}</h4>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded"
                      title="Remove link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title (English)</label>
                    <input
                      type="text"
                      {...register(`links.${index}.label_en`)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="About Us"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Title (मराठी)</label>
                    <input
                      type="text"
                      {...register(`links.${index}.label_mr`)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="आमच्याबद्दल"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">URL</label>
                    <input
                      type="url"
                      {...register(`links.${index}.url`, {
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: "Please enter a valid URL"
                        }
                      })}
                      className={`w-full border rounded px-3 py-2 ${errors.links?.[index]?.url ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="https://example.com/about"
                    />
                    {errors.links?.[index]?.url && (
                      <p className="text-red-500 text-sm mt-1">{errors.links[index].url.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Developer Information</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Developed By *</label>
            <input
              type="text"
              {...register("developedBy", {
                required: "Developer information is required"
              })}
              className={`w-full border rounded px-3 py-2 ${errors.developedBy ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Your Company Name"
            />
            {errors.developedBy && (
              <p className="text-red-500 text-sm mt-1">{errors.developedBy.message}</p>
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
            {isSubmitting ? (data?._id ? 'Updating...' : 'Creating...') : (data?._id ? 'Update Footer' : 'Create Footer')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FooterEdit;