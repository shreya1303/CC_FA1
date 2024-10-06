import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import axios from "axios";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      setFiles(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="App">
      <h1>Notes App</h1>
      <FileUpload fetchFiles={fetchFiles} />
      <FileList files={files} fetchFiles={fetchFiles} />
    </div>
  );
}

export default App;
