import { useContext } from 'react';
import { AdContext } from '../../contexts/adContext'; 
// import { UserContext } from '../../contexts/UserContext';

const MyAds = () => {
  const { userAds } = useContext(AdContext)

  // const userAds = localStorage.getItem('userAds');
  console.log('userAds inside my adssss',userAds)
  return (
    <main>
      <div>
          <h1>Your Ads</h1>
          {userAds.length > 0 ? (
            <ul>
              {userAds.map((ad) => (
                <li key={ad._id}>
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <p>Price: ${ad.price}</p>
                  <p>Status: {ad.status}</p>
                  <p>Location: {ad.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no ads.</p>
          )}
        </div>
    </main>
  );
};

export default MyAds;