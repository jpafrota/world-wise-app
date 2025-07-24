import { useContext } from "react";
import { CitiesContext } from "./CitiesContext";

function useCities() {
  const context = useContext(CitiesContext);

  if (!context)
    throw new Error("CitiesContext needs to be wrapped inside a provider");

  return context;
}

export { useCities };
