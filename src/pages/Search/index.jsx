import './styles.css';
import { PostDetails } from '../../components/PostDetails';
import { Link } from 'react-router-dom';
// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className="search-container">
      <h2>Resultados para: {search}</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className="noposts">
            <p>Nenhum post foi encontrado...</p>
            <button className="btn btn-dark">
              <Link to="/">Voltar</Link>
            </button>
          </div>
        )}
        {posts && posts.map((post) => <PostDetails key={post.id} {...post} />)}
      </div>
    </div>
  );
};

export { Search };
