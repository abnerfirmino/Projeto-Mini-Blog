import './styles.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  const { updateDocument, response } = useUpdateDocument('posts');

  // estados
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(', ');
      setTags(textTags);
    }
  }, [post]);

  const hadleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // validando a URL da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.');
    }

    // criando o array de no máximo 3 tags
    const array = tags.split(',').map((tag) => tag.trim().toLowerCase());
    const tagsFinalArray = array.slice(0, 3);

    // checando todos os valores
    if (!title || !image || !tags || !body) {
      setFormError('Por favor, preecha todos os campos!');
    }

    if (formError) {
      return false;
    }

    const data = {
      title: title.toUpperCase(),
      image,
      body,
      tagsArray: tagsFinalArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    setTitle('');
    setImage('');
    setBody('');
    setTags('');

    // Redireciona o usuáro para Home
    navigate('/dashboard');
  };

  return (
    <div className="edit-post">
      {post && (
        <>
          <h2>Editar post: {post.title}</h2>
          <p>Faça as alterações que você deseja!</p>
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
            <p className="title-preview">Sua imagem atual:</p>
            <img className="image-preview" src={post.image} alt={post.title} />
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
                Salvar
              </button>
            )}
            {response.loading && (
              <button className="btn" type="submit" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <span className="error">{response.error}</span>}
          </form>
          {formError && <span className="error">{formError}</span>}
        </>
      )}
      {!post && (
        <div className="noposts">
          <p>Post não encontrado...</p>
        </div>
      )}
    </div>
  );
};

export { EditPost };
