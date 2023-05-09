import './styles.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { PostDetails } from '../../components/PostDetails';

const Home = () => {
  const { userName } = useAuthContext();
  const [query, setQuery] = useState('');
  const { documents: posts, error, loading } = useFetchDocuments('posts');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home">
      {userName && <h1>Olá, {userName}!</h1>}
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
