import React from "react";
import axios from "axios";

const FileList = ({ files, fetchFiles }) => {
  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://13.60.18.94:5000/delete/${key}`);
      fetchFiles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {files.map((file) => (
        <div key={file.key}>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.key}
          </a>
          <button onClick={() => handleDelete(file.key)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default FileList;
