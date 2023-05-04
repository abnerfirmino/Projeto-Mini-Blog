import './styles.css';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  // estados
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  // states dos hooks
  const { user } = useAuthContext();
  const { insertDocument, response } = useInsertDocument('posts');

  const navigate = useNavigate();

  const hadleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // validando a URL da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.');
    }

    // criando o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    // checando todos os valores
    if (!title || !image || !tags || !body) {
      setFormError('Por favor, preecha todos os campos!');
    }

    if (formError) {
      return false;
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      id: user.uid,
      createdBy: user.displayName,
    });

    setTitle('');
    setImage('');
    setBody('');
    setTags('');

    // Redireciona o usuáro para Home
    navigate('/');
  };

  return (
    <div className="create-post">
      <h2>Criar post</h2>
      <p>Escreva sobre um assunto e compartilhe o seu conhecimento!</p>
      <form onSubmit={hadleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que representa o seu post."
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira aqui o conteúdo do post."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as palavras-chave separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && (
          <button className="btn" type="submit">
            Postar
          </button>
        )}
        {response.loading && (
          <button className="btn" type="submit" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <span className="error">{response.error}</span>}
        {formError && <span className="error">{formError}</span>}
      </form>
    </div>
  );
};

export { CreatePost };
