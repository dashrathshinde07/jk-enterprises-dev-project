import { useState } from "react";

const ImageUploader = ({ label, image, setImage }) => {
  const [preview, setPreview] = useState(image || null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type="file" accept="image/*" onChange={handleChange} className="block w-full" />
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover border rounded-md" />}
    </div>
  );
};

export default ImageUploader;
