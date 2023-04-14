import { useState } from 'react';
import './styles.css';

const Register = () => {
  // estados do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // função do submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = {
      name, 
      email, 
      password
    }

    // Validação da senha
    if(password !== confirmPassword) {
      setError("ERRO! As senhas devem ser iguais!");
      return false;
    }

    return true;
  }

  return (
    <div className='register'>
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
        {error && <span className='error'>{error}</span>}
        <button className='btn' type='submit'>Cadastrar</button>
      </form>
    </div>
  );
}

export { Register };
