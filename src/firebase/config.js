import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgII32bH5FZLS2G19t3i9UVNsQ9gWoQnw",
  authDomain: "yetibooksellers.firebaseapp.com",
  projectId: "yetibooksellers",
  storageBucket: "yetibooksellers.appspot.com",
  messagingSenderId: "338025267645",
  appId: "1:338025267645:web:47fac1ba05ef65599892d4",
};
// init app
initializeApp(firebaseConfig);
// init firestore service
const projectDB = getFirestore();
// init storage object
const projectStorage = getStorage();
const timeStamp = serverTimestamp();

// export to import into diff react components
export { projectDB, projectStorage, timeStamp };
