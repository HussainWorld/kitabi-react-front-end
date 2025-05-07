import { createContext, useState, useEffect, useContext } from "react";
import { getAllWantedAds } from "../services/wantedAdService";
import { UserContext } from "./UserContext";

const WantedAdContext = createContext();

const WantedAdContextProvider = ({ children }) => {
  const [wantedAds, setWantedAds] = useState([]);

  const [userWantedAds, setUserWantedAds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [trigger, setTrigger] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const fetchedWantedAds = await getAllWantedAds();
        setWantedAds(fetchedWantedAds);
        localStorage.setItem("wantedAds", JSON.stringify(fetchedWantedAds));
        
        const userId = user._id;
        const userWantedAds = fetchedWantedAds.filter(ad => ad.userId === userId);
        setUserWantedAds(userWantedAds)

        console.log('user id',userId)
        console.log('fetched wanted ads', fetchedWantedAds)
        localStorage.setItem("user Wanted Ads", JSON.stringify(userWantedAds))
        console.log('user wanted ads inside the contsxt',userWantedAds)
      } catch (err) {
        setError("Failed to fetch the wanted ads.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [user, trigger]);

  return (
    <WantedAdContext.Provider value={{ wantedAds, userWantedAds, setWantedAds, loading, error, trigger, setTrigger }}>
      {children}
    </WantedAdContext.Provider>
  );
};

export { WantedAdContext, WantedAdContextProvider };