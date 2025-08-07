import { useContext } from "react";
import { MapContext } from "./MapContext";

function useMap() {
  const context = useContext(MapContext);

  if (!context)
    throw new Error("MapContext needs to be wrapped inside a provider");

  return context;
}

export { useMap };
