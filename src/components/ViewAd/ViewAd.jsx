import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as adService from '../../services/adService';

import { AdContext } from '../../contexts/adContext';

import { UserContext } from '../../contexts/UserContext';

import './ViewAd.css'

const ViewAd = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

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
          
          {ad ? (
             <div className="container mt-5">
             <div className="row">
               {/* Product Images */}
               <div className="col-md-6 mb-4">
                 <img
                   src={ad.image}
                   alt="Product"
                   className="img-fluid rounded mb-3 product-image"
                   id="mainImage"
                 />
               </div>
         
               {/* Product Details */}
               <div className="col-md-6">
                 <h2 className="mb-3">{ad.title}</h2>
                 {/* <p className="text-muted mb-4">SKU: WH1000XM4</p> */}
                 <div className="mb-3">
                   <span className="h4 me-2">BD {ad.price}</span>
                 </div>

                 <div className="mb-4">
                 <p className="mb-4"> {ad.description} </p>
                 </div>

                  <div className="mb-4 d-flex align-items-center">
                    <h5 className="mb-0 me-2">Category:</h5>
                    <p className="mb-0">{ad.category}</p>
                  </div>

                  <div className="mb-4 d-flex align-items-center">
                    <h5 className="mb-0 me-2">Status:</h5>
                    <p className="mb-0">{ad.status}</p>
                  </div>

                  <div className="mb-4 d-flex align-items-center">
                    <h5 className="mb-0 me-2">Location:</h5>
                    <p className="mb-0">{ad.location}</p>
                  </div>
                 
                  <button id='whatsAppButton' type="submit">
                    <img id='whatsAppImg' src="../../../Images/whatsApp.png" alt="whatsAppImg" border="0" />
                  </button>

                  <button id='shareButton' type="submit">
                    <img id='shareImg' src="../../../Images/share.png" alt="shareImg" border="0" />
                  </button>
                 
                 <div className="mt-4">
                      {ad.userId === user._id ? (
                        <button className="button-24" role="button" onClick={handleDelete}>Delete</button>
                    ) : null}
                    
                     { ad.userId === user._id ? (
                      <button className='button-23' onClick={() => navigate(`/my-ads/${adId}/edit`)}>
                        Update 
                      </button>
                      ) : null}
                 </div>

               </div>
             </div>
           </div>
          ) : (
            <p>There is no information to ur advertise.</p>
          )}
    </main>
  )
}

export default ViewAd;