import { useCities } from "@/context/useCities";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useURLPosition } from "@/hooks/useURLPosition";
import Button from "@/components/Button/Button";
import styles from "./Map.module.css";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([0, 40]);
  const {
    position: geoLocationPosition,
    getPosition: getGeoLocation,
    isLoading: isGeoLocationLoading,
    error,
  } = useGeolocation();
  const [urlLat, urlLng] = useURLPosition();

  useEffect(() => {
    // if there is not lat and lng values in the URL params,
    // prevent app from re-positioning the map.
    // instead, change position only if new values are provided.
    if (!urlLat || !urlLng) return;

    setMapPosition([Number(urlLat), Number(urlLng)]);
  }, [urlLat, urlLng]);

  useEffect(() => {
    if (!geoLocationPosition) return;
    setMapPosition(geoLocationPosition);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {geoLocationPosition !== mapPosition && (
        <Button type="position" onClick={getGeoLocation}>
          {isGeoLocationLoading ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer className={styles.map} center={mapPosition} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={city.position}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* react leaflet uses inner components to enable the imperative APIs of the map, 
        such as event listeners, going to another position, getting current location, etc!
        
        by default, map props are immutable if its children don´t change/re-render.*/}
        <OnMapCLick />
        <ChangeCity position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function OnMapCLick() {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

function ChangeCity({ position }) {
  const map = useMap();

  map.setView(position);

  return null;
}

export default Map;
