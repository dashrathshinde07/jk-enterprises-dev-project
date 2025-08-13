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
      <label className="block text-sm font-medium text-gray-700">{label} Image</label>
      <input type="file" accept="image/*" onChange={handleChange}
        // className="block w-full" 
        className="w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover border rounded-md" />}
    </div>
  );
};

export default ImageUploader;