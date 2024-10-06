import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import axios from "axios";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://13.60.18.94:5000/files");
      setFiles(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div
      className="App min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url('/path-to-your-image.jpg')` }}
    >
      <h1 className="text-4xl text-white font-bold mb-6">Notes App</h1>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <FileUpload fetchFiles={fetchFiles} />
        <FileList files={files} fetchFiles={fetchFiles} />
      </div>
    </div>
  );
}

export default App;
