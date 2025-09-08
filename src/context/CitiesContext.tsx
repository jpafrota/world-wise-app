import { createContext, useCallback, useEffect, useReducer } from "react";

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

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        currentCity: {},
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function fetchCities() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch (error) {
      console.error("Failed to fetch cities: ", error);
      dispatch({ type: "error", payload: "Failed to fetch cities: " });
    }
  }

  // async function getCity(id: string) {
  //   if (id === currentCity.id) return;

  //   dispatch({ type: "loading" });
  //   try {
  //     const res = await fetch(`${BASE_URL}/cities/${id}`);
  //     const data = await res.json();
  //     dispatch({ type: "city/loaded", payload: data });
  //   } catch (error) {
  //     console.error("Failed to get city: ", error);
  //     dispatch({ type: "error", payload: "Failed to get city: " });
  //   }
  // }

  const getCity = useCallback(
    async function getCity(id: string) {
      if (id === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        console.error("Failed to get city: ", error);
        dispatch({ type: "error", payload: "Failed to get city: " });
      }
    },
    [currentCity.id]
  );

  async function createCity(city: any) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "city/created", payload: city });

      await fetchCities();
    } catch (error) {
      console.error("Failed to create city: ", error);
      dispatch({ type: "error", payload: "Failed to create city: " });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted" });
    } catch (error) {
      console.error("Failed to delete city: ", error);
      dispatch({ type: "error", payload: "Failed to delete city: " });
    }

    await fetchCities();
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
