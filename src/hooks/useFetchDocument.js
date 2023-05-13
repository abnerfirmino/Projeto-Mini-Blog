import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // tratando memory leak
  const isCancelled = useRef(false);

  function checkIfIsCancelled() {
    if (isCancelled.current) {
      return false;
    }
  }

  useEffect(() => {
    const loadDocument = async () => {
      checkIfIsCancelled();

      try {
        setLoading(true);

        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();
        setDocument(docData);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    };

    loadDocument();

    return () => {
      isCancelled.current = true;
    };
  }, [docCollection, id]);

  return { document, error, loading };
};

export { useFetchDocument };
