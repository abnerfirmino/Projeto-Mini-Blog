import { useEffect, useState } from 'react';
import './styles.css';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  // estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // fazendo a autenticação do usuário
  const { createUser, error: authError, loading } = useAuthentication();

  // função do submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      name,
      email,
      password,
    };

    // erro de validação da senha
    if (password !== confirmPassword) {
      setError('ERRO! As senhas devem ser iguais!');
      return false;
    }

    // criando o usuário
    await createUser(user);

    return true;
  };

  // monitora o erro de autenticação
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="register">
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário para compartilhar histórias!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && (
          <button className="btn" type="submit">
            Cadastrar
          </button>
        )}
        {loading && (
          <button className="btn" type="submit" disabled>
            Aguarde...
          </button>
        )}
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
};

export { Register };
