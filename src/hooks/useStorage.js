import { useState, useEffect } from "react";
import { projectStorage, projectDB, timeStamp } from "../firebase/config";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

// custom hook to handle file uploads/firebase storage, will use in UploadForm component
// hook responsilble for handling file uploads, returning uplaod progress, errors, image ur after uploaded
// param file comes from user selection in UploadForm
// code needs to run every time new file value, user selects diff files, put logic inside useffect hook
const useStorage = (file) => {
  // 3 pieces of state
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  // image url get back from storage after upload complete
  const [url, setUrl] = useState(null);
  // use storage objcet from firebase to upload file param

  // all logic to uplaod file
  useEffect(() => {
    // references:
    // reference to file inside the defdualt storage bucket
    // create refrence to file
    const storageRef = ref(projectStorage, file.name);
    // collection reference -firestore
    const collectionRef = collection(projectDB, "images");
    // put file in refrence location
    // this uploads file to reference from ref method above
    // async:
    // snap = snapshot object, snapshot in time of the upload at that moment
    const uploadTask = uploadBytesResumable(storageRef, file);

    // on method takes four args, 3 functions
    // upload file
    uploadTask.on(
      "state_changed",
      (snap) => {
        // totalBytes is total file size
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        // async funcion, use await inside
        // get url of image just uploaded
        const url = await getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            return downloadURL;
          }
        );
        const createdAt = timeStamp;
        //add doc of image url to firestore database
        addDoc(collectionRef, { url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
  // use this hook in a component and u can access these values
};

export default useStorage;
