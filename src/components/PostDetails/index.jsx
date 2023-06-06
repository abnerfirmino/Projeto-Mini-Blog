import './styles.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';

const PostDetails = ({ id, createdBy, image, tagsArray, title }) => {
  return (
    <div className="post-details">
      <figure>
        <img src={image} alt={title} />
      </figure>
      <h2>{title}</h2>
      <p className="created-by">Criado por: {createdBy}</p>
      <div className="tags">
        {tagsArray
          // eslint-disable-next-line react/prop-types
          .filter((tag) => tag !== '')
          .map((tag) => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
      </div>
      <Link to={`/posts/${id}`} className="btn btn-outline">
        Ler...
      </Link>
    </div>
  );
};

export { PostDetails };

PostDetails.propTypes = {
  id: PropTypes.number.isRequired,
  createdBy: PropTypes.string.isRequired,
  image: urlPropType.isRequired,
  tagsArray: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
