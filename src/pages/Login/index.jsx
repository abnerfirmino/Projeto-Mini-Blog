import { useEffect, useState } from 'react';
import './styles.css';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Link } from 'react-router-dom';

const Login = () => {
  // estados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // fazendo a autenticação do usuário
  const { login, error: authError, loading } = useAuthentication();

  // função do submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      email,
      password,
    };

    // criando o usuário
    await login(user);

    window.location.reload(false);
    return true;
  };

  // monitora o erro de autenticação
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="login">
      <h1>Entrar</h1>
      <p>Faça seu login para postar!</p>
      <form onSubmit={handleSubmit}>
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
        {!loading && (
          <button className="btn" type="submit">
            Login
          </button>
        )}
        {loading && (
          <button className="btn" type="submit" disabled>
            Aguarde...
          </button>
        )}
        <p className="new-user">
          <strong>
            <Link to="/register">Cadastre-se aqui!</Link>
          </strong>
        </p>
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
};

export { Login };
