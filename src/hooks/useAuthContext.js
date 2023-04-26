import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.log('ERRO! Context não encontrado.');
    return false;
  }

  return context;
};

export { useAuthContext };
