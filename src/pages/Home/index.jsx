import './styles.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { PostDetails } from '../../components/PostDetails';

const Home = () => {
  const { user } = useAuthContext();
  const [query, setQuery] = useState('');
  const { documents: posts, error, loading } = useFetchDocuments('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="home">
      {user && (
        <div className="user-welcome">
          <figure className="profile-picture">
            <img
              src={
                user.photoURL
                  ? `${user.photoURL}`
                  : 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'
              }
              className="user-picture"
              alt="Imagem do usuário"
              title="Editar Perfil"
            />
          </figure>
          <h1>Olá, {user.displayName}!</h1>
        </div>
      )}
      <h1>Veja os nossos posts mais recentes</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque por palavras-chave..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          title="Busque por palavras-chave."
        />
        <button className="btn btn-dark" type="submit">
          Pesquisar
        </button>
      </form>
      <div>
        {loading && (
          <p>
            <strong>Carregando...</strong>
          </p>
        )}
        {error && (
          <p>
            <strong>Ocorreu um erro ao carregar os dados :(</strong>
          </p>
        )}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className="noposts">
            <p>Nenhum post foi encontrado...</p>
            <button className="post-btn">
              <Link to="/posts/create">Novo post</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Home };
