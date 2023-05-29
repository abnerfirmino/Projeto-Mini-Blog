import { useEffect, useState } from 'react';
import './styles.css';
import { useAuthentication } from '../../hooks/useAuthentication';

// imports no file storage
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Register = () => {
  // estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  // file storage (imagem do usuário)
  const [currentPicture, setCurrentPicture] = useState('');
  const [newPicture, setNewPicture] = useState('');

  // fazendo a autenticação do usuário
  const { createUser, error: authError, loading } = useAuthentication();

  useEffect(() => {
    // fazendo o upload de arquivos (imagem)
    const uploadFile = async () => {
      const imageName = new Date().getTime() + currentPicture.name;

      // referência da imagem no storage
      const storageRef = ref(storage, `profileImages/${imageName}`);

      // processo de updload
      const uploadTask = uploadBytesResumable(storageRef, currentPicture);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload ' + progress + '% concluído.');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload pausado.');
              break;
            case 'running':
              console.log('Fazendo upload da imagem...');
              break;
            default:
              console.log('Ocorreu um erro :(');
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewPicture(downloadURL);
          });
        },
      );
    };
    currentPicture && uploadFile();
  }, [currentPicture]);

  // função do submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      name,
      email,
      password,
      photoUrl: newPicture,
    };

    // erro de validação da senha
    if (password !== confirmPassword) {
      setError('ERRO! As senhas devem ser iguais!');
      return false;
    }

    // criando o usuário
    await createUser(user);

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
    <div className="register">
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário para compartilhar histórias!</p>
      <form onSubmit={handleSubmit}>
        <div className="user-welcome">
          <figure className="profile-picture">
            <img
              src={
                currentPicture
                  ? { currentPicture }
                  : newPicture
                  ? { newPicture }
                  : 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'
              }
              className="user-picture"
              alt="Imagem do usuário"
              title="Editar Imagem"
            />
          </figure>
          <label className="edit-picture" title="Editar Imagem">
            &#x270E; Editar
            <input
              className="hidden"
              type="file"
              name="profilePicture"
              onChange={(e) => setCurrentPicture(e.target.files[0])}
            />
          </label>
        </div>
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
