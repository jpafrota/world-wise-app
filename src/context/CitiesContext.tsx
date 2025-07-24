import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const BASE_URL = "http://localhost:8001";

const CitiesContext = createContext<
  | {
      cities: Array<any>;
      isLoading: boolean;
      currentCity: any;
      getCity: (id: string) => void;
    }
  | undefined
>(undefined);

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Failed to fetch cities: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ isLoading, cities, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
