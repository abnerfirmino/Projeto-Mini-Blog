import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  and,
} from 'firebase/firestore';

const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
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
    const loadData = async () => {
      checkIfIsCancelled();

      const collectionRef = await collection(db, docCollection);

      try {
        setLoading(true);

        let q;

        if (search) {
          q = await query(
            collectionRef,
            where('tagsArray', 'array-contains', search),
            orderBy('createdAt', 'desc'),
          );
        } else {
          q = await query(collectionRef, orderBy('createdAt', 'desc'));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    };

    loadData();

    return () => {
      isCancelled.current = true;
    };
  }, [docCollection, search, uid]);

  return { documents, error, loading };
};

export { useFetchDocuments };
