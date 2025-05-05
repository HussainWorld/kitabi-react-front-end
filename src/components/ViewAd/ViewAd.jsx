import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as adService from '../../services/adService';

import { AdContext } from '../../contexts/adContext';


const ViewAd = () => {
  const navigate = useNavigate();
  const { ads, setAds } = useContext(AdContext); 

  const { adId } = useParams();

  const [ad, setAd] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("danger");

  useEffect(() => {
    const fetchAd = async () => {
      const adData = await adService.view(adId)
      setAd(adData)
    };
    fetchAd();
  }, [adId]);


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
    try{
      await adService.deleteAd(adId);

      const updatedAds = ads.filter((ad) => ad._id !== adId);
      setAds(updatedAds);
      localStorage.setItem('ads', JSON.stringify(updatedAds));

      alert("The advertisment is deleted successfully!");
      navigate("/my-ads");
    }catch(err){
      setMessage(err.message);
      setMessageType("danger");
    }
  };
    
  };

  console.log('the advertisment', ad);
  
  return (
    <main>
      <h1>Ads details</h1>
          
          {ad ? (
            <article>
              <h3>Title: {ad.title}</h3>
              <p>Description: {ad.description}</p>
              <p>Price BHD: {ad.price}</p>
              <p>Status: {ad.status}</p>
              <p>Location: {ad.location}</p>
              <img src={ad.image || 'default-placeholder.jpg'} alt="Ad Image" />              <button onClick={handleDelete}>
                Delete
              </button>
              <button onClick={() => navigate(`/my-ads/${adId}/edit`)}>
                Update 
              </button>
            </article>
          ) : (
            <p>There is no information to ur advertise.</p>
          )}
    </main>
  )
}

export default ViewAd;