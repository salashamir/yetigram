import { useState, useEffect } from "react";
import { projectDB } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

// input param collection we want to cyrcle throuugh to get images
const useFirestore = (coll) => {
  // set up state for docs retrieved from collcetion
  // empty arr: no docs to begin with
  const [docs, setDocs] = useState([]);
  //all database communication will go inside s useeffect hook so it can rerun every time our db changes
  useEffect(() => {
    const q = query(collection(projectDB, coll), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      // snapshot notifies and we get snap whenever new image added
      let documents = [];
      snapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    // reutrn cleanupfunction to sunsub, stop listening when our image gallery unmoutns, immage gallery will eb calling this hook remember
    return () => unsub();
  }, [collection]);

  // return docs once we have them
  return { docs };
};

export default useFirestore;
