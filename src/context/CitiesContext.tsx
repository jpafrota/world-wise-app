import { createContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8001";

const CitiesContext = createContext<
  | {
      cities: Array<any>;
      isLoading: boolean;
      currentCity: any;
      getCity: (id: string) => void;
      createCity: (city: any) => Promise<void>;
      deleteCity: (id: string) => Promise<void>;
    }
  | undefined
>(undefined);

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  async function createCity(city: any) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Failed to insert data: ", error);
    } finally {
      setIsLoading(false);
      await fetchCities();
    }
  }

  async function deleteCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Failed to delete city: ", error);
    } finally {
      setIsLoading(false);
      await fetchCities();
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
