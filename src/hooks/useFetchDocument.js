import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, query, onSnapshot, where } from 'firebase/firestore';

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

      const collectionRef = collection(db, docCollection);

      try {
        setLoading(true);

        const q = await query(collectionRef, where('id', '==', id));

        onSnapshot(q, (querySnapshot) => {
          const documentArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const arrayToDocument = Object.assign({}, ...documentArray);
          setDocument(arrayToDocument);
        });

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
