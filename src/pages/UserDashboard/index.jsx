import './styles.css';
import { Link } from 'react-router-dom';
// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useAuthContext } from '../../hooks/useAuthContext';

// components
import { PostDetails } from '../../components/PostDetails';

const UserDashboard = () => {
  const { user } = useAuthContext();
  const uid = user.uid;

  // armazenamento dos posts do usuário
  const {
    documents: posts,
    error,
    loading,
  } = useFetchDocuments('posts', null, uid);

  const deleteDocument = (id) => {
    return;
  };

  return (
    <div className="dashboard">
      <h2 className="title">Dashboard</h2>
      <p className="desc">Gerencie seus posts!</p>
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
      {/* Exibe todos os posts do usuário */}
      {posts && posts.length > 2 && (
        <div className="grid">
          {posts.map((post) => (
            <div key={post.id}>
              <PostDetails post={post} />
              <div className="buttons">
                <Link to={`posts/edit/${post.id}`} className="btn btn-outline">
                  Editar
                </Link>
                {/* deletando documentos por id */}
                <button
                  className="btn"
                  type="submit"
                  onClick={() => deleteDocument(post.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {posts &&
        posts.length <= 2 &&
        posts.map((post) => (
          <>
            <PostDetails key={post.id} post={post} />
            <div className="buttons">
              <Link to={`posts/edit/${post.id}`} className="btn btn-outline">
                Editar
              </Link>
              {/* deletando documentos por id */}
              <button
                className="btn"
                type="submit"
                onClick={() => deleteDocument(post.id)}
              >
                Excluir
              </button>
            </div>
          </>
        ))}
      {posts && posts.length === 0 && (
        <div className="noposts">
          <p>Nenhum post foi encontrado...</p>
          <button className="post-btn">
            <Link to="/posts/create">Novo post</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export { UserDashboard };
