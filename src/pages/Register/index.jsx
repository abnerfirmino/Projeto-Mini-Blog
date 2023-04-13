import './styles.css';

const Register = () => {

  return (
    <div className='register'>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário para compartilhar histórias!</p>
      <form>
        <label>
          <span>Nome:</span>
          <input 
            type="text" 
            name="displayName" 
            required 
            placeholder="Nome do usuário"
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input 
            type="email" 
            name="email" 
            required 
            placeholder="E-mail do usuário"
          />
        </label>
        <label>
          <span>Senha:</span>
          <input 
            type="password" 
            name="password" 
            required 
            placeholder="Insira sua senha"
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input 
            type="password" 
            name="confirmPassword" 
            required 
            placeholder="Confirme sua senha"
          />
        </label>
        <button className='btn' type='submit'>Cadastrar</button>
      </form>
    </div>
  );
}

export { Register };
