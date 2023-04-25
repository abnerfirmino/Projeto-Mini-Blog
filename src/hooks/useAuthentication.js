// importação do banco de dados do firebase
import { db } from '../firebase/config';

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
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      // criando o usuário
      const {user} = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
      });

      setLoading(false);
      return user;

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      // tratando o erro para o usuário
      let systemErrorMessage;

      if(error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if(error.message.includes("email-already")) {
        systemErrorMessage = "Esse e-mail já está cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  }

  // Função do Log out do firebase
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  }

  // função de login do Firebase
  const login = async (data) => {
    checkIfIsCancelled();

    try {
      setLoading(true);

      const {user} = await signInWithEmailAndPassword(
        auth, data.email, data.password
      );

      setLoading(false);

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      // tratando o erro para o usuário
      let systemErrorMessage;

      if(error.message.includes("user-not-found")) {
        systemErrorMessage = "ERRO! Usuário não encontrado.";
      } else if(error.message.includes("wrong-password")) {
        systemErrorMessage = "ERRO! Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  }

  // limpa os estados antes de sair do componente
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { 
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  }
}

export { useAuthentication }
