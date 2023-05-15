import { db } from '../firebase/config';
import { useEffect, useReducer, useRef } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';

const initialState = {
  loading: false,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'DELETED_DOC':
      return { ...state, loading: false, error: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // evitando memory leak
  const isCancelled = useRef(false);

  function checkIfIsCancelled() {
    if (isCancelled.current) {
      return false;
    }
  }

  const deleteDocument = async (id) => {
    checkIfIsCancelled();

    try {
      dispatch({ type: 'LOADING' });

      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      dispatch({ type: 'DELETED_DOC', payload: deletedDocument });
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

  return { deleteDocument, response };
};

export { useDeleteDocument };
