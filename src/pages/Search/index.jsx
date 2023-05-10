import './styles.css';
// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  return (
    <div className="search">
      <h2>Search</h2>
      <p>{search}</p>
    </div>
  );
};

export { Search };
