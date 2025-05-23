import { useContext } from 'react';
import { AdContext } from '../../contexts/adContext'; 
import { Link } from 'react-router';

const Dashboard = () => {

  const { ads } = useContext(AdContext); 

  return (
    <main>
          {ads && ads.length > 0 ? (
          <div className="container py-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {ads.map((ad) => (
                <div key={ad._id} className="col">
                  <Link to={`/my-ads/${ad._id}`} className="text-decoration-none">
                    <div className="card h-100">
                      <img src={ad.image} className="card-img-top" alt={ad.title} />
                      <div className="card-body">
                        <h5 className="card-title">{ad.title}</h5>
                        <h5 className="card-title">BD {ad.price}</h5> 
                        {/* <p className="card-text">{ad.description}</p> */}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          ) : (
            <p>No ads available.</p>
          )}
    
    </main>
  );
};

export default Dashboard;