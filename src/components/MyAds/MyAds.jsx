import { useContext } from 'react';
import { AdContext } from '../../contexts/adContext'; 
import { Link } from 'react-router';
// import { UserContext } from '../../contexts/UserContext';

const MyAds = () => {
  const { userAds } = useContext(AdContext)

  // const userAds = localStorage.getItem('userAds');
  console.log('userAds inside my adssss',userAds)
  return (
    <main>
          <h1>Your Ads</h1>
          
          {userAds && userAds.length > 0 ? (
              userAds.map((ad) => (
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
            <p>You have no ads.</p>
          )}
    </main>
  );
};

export default MyAds;