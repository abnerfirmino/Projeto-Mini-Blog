import { Link } from 'react-router-dom';
import './styles.css';

const About = () => {
  return (
    <div className="about">
      <h1>
        Sobre o Mini
        <span>Blog</span>
      </h1>
      <p>
        Este projeto é um blog feito com React no front-end e Firebase no
        back-end.
      </p>
      <Link to="/posts/create" className="btn">
        Novo post
      </Link>
    </div>
  );
};

export { About };
