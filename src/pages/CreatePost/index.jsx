import './styles.css';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  const hadleSubmit = (e) => {
    e.preventDefault();
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
        {!loading && (
          <button className="btn" type="submit">
            Postar
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

export { CreatePost };
