import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ fetchFiles }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://13.60.18.94:5000/upload", formData);
      fetchFiles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
      />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
