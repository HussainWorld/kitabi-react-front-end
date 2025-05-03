import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as adService from '../../services/adService';


const ViewAd = () => {
  const { adId } = useParams();
  console.log('ad ID', adId);

  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      const adData = await adService.view(adId)
      setAd(adData)
    };
    fetchAd();
  }, [adId]);

  console.log('the advertisment', ad);
  return (
    <main>
      <h1>Ads details</h1>
          
          {ad ? (
            <article>
              <h3>Title: {ad.title}</h3>
              <p>Description: {ad.description}</p>
              <p>Price: ${ad.price}</p>
              <p>Status: {ad.status}</p>
              <p>Location: {ad.location}</p>
            </article>
          ) : (
            <p>There is no information to ur advertise.</p>
          )}
    </main>
  )
}

export default ViewAd;