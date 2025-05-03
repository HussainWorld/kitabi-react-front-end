import { useContext } from 'react';
import { AdContext } from '../../contexts/adContext'; 
import { UserContext } from '../../contexts/UserContext';

import { Link } from 'react-router';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { ads } = useContext(AdContext); 

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the ads.
      </p>

      <main>
          <h1>Ads</h1>
          
          {ads && ads.length > 0 ? (
              ads.map((ad) => (
                <Link key={ad._id} to={`/my-ads/${ad._id}`}>
                <article>
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <p>Price: ${ad.price}</p>
                  <p>Status: {ad.status}</p>
                  <p>Location: {ad.location}</p>
                  </article>
                </Link>
              ))
          ) : (
            <p>No ads available.</p>
          )}
    </main>
    </main>
  );
};

export default Dashboard;