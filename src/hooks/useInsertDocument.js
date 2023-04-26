import { db } from '../firebase/config';
import { useEffect, useReducer, useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'INSERTED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    } else {
      return false;
    }
  };

  const insertDocument = async (document) => {
    checkCancelledBeforeDispatch({
      type: 'LOADING',
    });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument,
      );

      checkCancelledBeforeDispatch({
        type: 'INSERTED_DOC',
        payload: insertedDocument,
      });
    } catch (error) {
      checkCancelledBeforeDispatch({
        type: 'ERROR',
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};

export { useInsertDocument };
