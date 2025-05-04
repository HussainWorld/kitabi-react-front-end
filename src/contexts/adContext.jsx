import { createContext, useState, useEffect, useContext } from "react";
import { getAllAds } from "../services/adService";
import { UserContext } from "./UserContext";

const AdContext = createContext();

const AdContextProvider = ({ children }) => {
  const [ads, setAds] = useState([]);

  const [userAds, setUserAds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [trigger, setTrigger] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const fetchedAds = await getAllAds();
        setAds(fetchedAds);
        localStorage.setItem("ads", JSON.stringify(fetchedAds));

        // const token = localStorage.getItem('token');
        // const payload = token.split('.')[1];
        // const decodedPayload = JSON.parse(atob(payload));
        // const userId = decodedPayload.payload._id;
        
        const userId = user._id;
        const userAds = fetchedAds.filter(ad => ad.userId === userId);
        setUserAds(userAds)

        console.log('user id',userId)
        console.log('fetched ads', fetchedAds)
        localStorage.setItem("userAds", JSON.stringify(userAds))
        console.log('user ads inside the contsxt',userAds)
      } catch (err) {
        setError("Failed to fetch ads.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [user, trigger]);

  return (
    <AdContext.Provider value={{ ads, userAds, setAds, loading, error, trigger, setTrigger }}>
      {children}
    </AdContext.Provider>
  );
};

export { AdContext, AdContextProvider };