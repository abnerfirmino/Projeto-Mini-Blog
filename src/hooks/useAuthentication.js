import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  // evita memory leak
  const [cancelled, setCancelled] = useState(false);
  const auth = getAuth();

  function checkIfIsCancelled() {
    if(cancelled) {
      return false;
    }
  }

  // criando os usuários
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
      });

      return user;

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
    }

    setLoading(false);
  }

  // 
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { 
    auth,
    createUser,
    error,
    loading
  }
}

export { useAuthentication }
