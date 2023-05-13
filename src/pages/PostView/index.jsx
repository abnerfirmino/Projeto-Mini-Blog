import './styles.css';
import { useFetchDocument } from '../../hooks/useFetchDocument';
// importando os parametros do post
import { useParams } from 'react-router-dom';

const PostView = () => {
  const { id } = useParams();
  const { document: post, error, loading } = useFetchDocument('posts', id);
  console.log(post);

  return (
    <div className="post-view">
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
      {post && (
        <>
          <h1>{post.title}</h1>
          <figure>
            <img src={post.image} alt={post.title} />
          </figure>
          <p className="body">{post.body}</p>
          <h3>Esse post é sobre:</h3>
          <div className="tags">
            {post.tagsArray
              .filter((tag) => tag !== '')
              .map((tag) => (
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export { PostView };
