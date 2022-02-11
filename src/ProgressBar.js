import React, { useEffect } from "react";
import useStorage from "./hooks/useStorage";
import { motion } from "framer-motion";
// use the custom hook in this component to display progress

// inside progressbar component use usestorage hook to upload the file
// destructure props passed into progressbar
const ProgressBar = ({ file, setFile }) => {
  // destructure what we get back from usestorage hook
  // useffect in usestorage wil fire
  const { url, progress } = useStorage(file);
  // use useffect to fire a function when the value of url changes, so we can get rid of progress bar since our file is uplaoded
  useEffect(() => {
    if (url) {
      // progress bar wont show anymore bc file null
      setFile(null);
    }
  }, [url, setFile]);
  // style progres bar using style attribute with an object of css properties
  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
