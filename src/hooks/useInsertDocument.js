import { db } from '../firebase/config';
import { useEffect, useReducer, useRef } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const initialState = {
  loading: false,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'INSERTED_DOC':
      return { ...state, loading: false, error: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // evitando memory leak
  const isCancelled = useRef(false);

  function checkIfIsCancelled() {
    if (isCancelled.current) {
      return false;
    }
  }

  const insertDocument = async (document) => {
    checkIfIsCancelled();

    try {
      dispatch({ type: 'LOADING' });

      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument,
      );

      dispatch({ type: 'INSERTED_DOC', payload: insertedDocument });
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  // limpa os estados antes de sair do componente (cleanup)
  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return { insertDocument, response };
};

export { useInsertDocument };
