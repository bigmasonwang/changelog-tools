import { useState } from "react";

// This component is used to upload md file to the browser
const FileUpload = ({ handleFileUpload }) => {
  const [file, setFile] = useState(null);

  return (
    <div className="input-group mb-3">
      <input
        type="file"
        className="form-control"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => handleFileUpload(file)}
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
