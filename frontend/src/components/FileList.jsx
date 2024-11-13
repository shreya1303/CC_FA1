import React from "react";
import axios from "axios";

const FileList = ({ files, fetchFiles }) => {
  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://13.60.236.5:5000/delete/${key}`);
      fetchFiles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          key={file.key}
          className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
        >
          <div className="flex flex-col">
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {file.key}
            </a>
            
          </div>
          <button
            onClick={() => handleDelete(file.key)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileList;
