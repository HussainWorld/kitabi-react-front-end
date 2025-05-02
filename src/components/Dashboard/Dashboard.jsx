import { useContext } from 'react';
import { AdContext } from '../../contexts/adContext'; 
import { UserContext } from '../../contexts/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { ads } = useContext(AdContext); 

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the ads.
      </p>

      <h2>Ads</h2>
      <ul>
        {ads.length > 0 ? (
          ads.map((ad) => (
            <li key={ad._id}>
              <h3>{ad.title}</h3>
              <p>{ad.description}</p>
              <p>Price: ${ad.price}</p>
              <p>Status: {ad.status}</p>
              <p>Location: {ad.location}</p>
            </li>
          ))
        ) : (
          <p>No ads available</p>
        )}
      </ul>
    </main>
  );
};

export default Dashboard;