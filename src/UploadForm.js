import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
// import firebase sotrage obejct to upload mimages
// create custom hook to handle file uploads/forebase storage

const UploadForm = () => {
  // local state
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  // array of allowed types
  const types = ["image/png", "image/PNG", "image/jpeg", "image/jpg"];
  // handles file being chosen
  const changeHandler = (e) => {
    // access file user has selected; get info from event object
    // get first, some uploaders allow multiple file selection
    let selected = e.target.files[0];
    // store file in local state; only update state if file selected
    // evaluates to false if no file selected
    // also check that file is image type only
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      console.log(file);
      // reset error to null when something valid chosen
      setError(null);
    } else {
      setFile(null);
      // register error
      setError("Please select a valid file type (png, jpeg)");
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
      {/* output file or error */}
      <div className="output">
        {/* conditional rendering */}
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {/* only output progress bar when file selected: pas prop into progressbar component */}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
