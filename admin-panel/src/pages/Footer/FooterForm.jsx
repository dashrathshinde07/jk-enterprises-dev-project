import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { updateFooterById, createFooter } from "../../api/footerApi";
// import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const FooterForm = ({ data, onSuccess }) => {
  // const [lang, setLang] = useState("en");

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

  const [logo, setLogo] = useState(data?.logoUrl || null);

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
                      placeholder="About us"
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
              placeholder="Your company name"
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

export default FooterForm;