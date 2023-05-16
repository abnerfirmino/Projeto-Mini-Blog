import { db } from '../firebase/config';
import { useEffect, useReducer, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

const initialState = {
  loading: false,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'UPDATED_DOC':
      return { ...state, loading: false, error: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  // evitando memory leak
  const isCancelled = useRef(false);

  function checkIfIsCancelled() {
    if (isCancelled.current) {
      return false;
    }
  }

  const updateDocument = async (id, data) => {
    checkIfIsCancelled();

    try {
      dispatch({ type: 'LOADING' });

      const docRef = await doc(db, docCollection, id);
      const updateDocument = await updateDoc(docRef, data);

      dispatch({ type: 'UPDATED_DOC', payload: updateDocument });
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

  return { updateDocument, response };
};

export { useUpdateDocument };
