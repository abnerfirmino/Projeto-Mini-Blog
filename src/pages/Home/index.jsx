import './styles.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const Home = () => {
  const { userName } = useAuthContext();
  const [query, setQuery] = useState('');
  const [posts] = useState([]);

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
        />
        <button className="btn btn-dark" type="submit">
          Pesquisar
        </button>
      </form>
      <div>
        <h1>Posts...</h1>
        {posts && posts.length === 0 && (
          <div className="noposts">
            <p>Não foram encontrados posts :(</p>
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
