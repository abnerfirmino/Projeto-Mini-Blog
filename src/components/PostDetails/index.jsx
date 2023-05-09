import './styles.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';

const PostDetails = ({ post }) => {
  return (
    <div className="post-details">
      <figure>
        <img src={post.image} alt={post.title} />
      </figure>
      <h2>{post.title}</h2>
      <p className="created-by">Criado por: {post.createdBy}</p>
      <div className="tags">
        {/* eslint-disable-next-line react/prop-types */}
        {post.tagsArray.map((tag, i) => (
          <p key={i}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler...
      </Link>
    </div>
  );
};

export { PostDetails };

PostDetails.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      tagsArray: PropTypes.array.isRequired,
      image: urlPropType.isRequired,
    }),
  ),
};
