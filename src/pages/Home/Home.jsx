import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/image-galley-by-button">
              Image Gallery with load more button
            </Link>
          </li>
          <li>
            <Link to="/image-galley-scrolled">
              Image Gallery with infinite scroll
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
