import { LatLng } from "leaflet";
import { createContext, useState } from "react";

const MapContext = createContext<
  | {
      latLng: LatLng | undefined;
      setLatLng: (latLng: LatLng) => void;
    }
  | undefined
>(undefined);

function MapProvider({ children }) {
  const [latLng, setLatLng] = useState<LatLng>();

  return (
    <MapContext.Provider value={{ latLng, setLatLng }}>
      {children}
    </MapContext.Provider>
  );
}

export { MapProvider, MapContext };
