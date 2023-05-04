import './styles.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';

const PostDetails = ({ post }) => {
  return (
    <div>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.createdBy}</p>
      <div className="tags">
        {/* eslint-disable-next-line react/prop-types */}
        {post.tagsArray.map((tag, i) => (
          <p key={i}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline"></Link>
    </div>
  );
};

export { PostDetails };

PostDetails.propTypes = {
  post: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      tagsArray: PropTypes.array.isRequired,
      image: urlPropType.isRequired,
    }),
  ),
};
