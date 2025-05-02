import { createContext, useState, useEffect } from "react";
import { getAllAds } from "../services/adService"; // Assuming you have this service to get all ads

const AdContext = createContext();

const AdContextProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // To store any errors from fetching ads

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const fetchedAds = await getAllAds(); // Call the getAllAds service
        setAds(fetchedAds);
        localStorage.setItem("ads", JSON.stringify(fetchedAds)); // Store ads in localStorage
      } catch (err) {
        setError("Failed to fetch ads.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <AdContext.Provider value={{ ads, setAds, loading, error }}>
      {children}
    </AdContext.Provider>
  );
};

export { AdContext, AdContextProvider };