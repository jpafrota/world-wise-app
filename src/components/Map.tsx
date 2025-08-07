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
import { useNavigate, useSearchParams } from "react-router";
import { useCities } from "../context/useCities";
import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([0, 40]);
  const {
    position: geoLocationPosition,
    getPosition: getGeoLocation,
    isLoading: isGeoLocationLoading,
    error,
  } = useGeolocation();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    // if there is not lat and lng values in the URL params,
    // prevent app from re-positioning the map.
    // instead, change position only if new values are provided.
    if (!mapLat || !mapLng) return;

    setMapPosition([Number(mapLat), Number(mapLng)]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (!geoLocationPosition) return;
    setMapPosition(geoLocationPosition);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {geoLocationPosition !== mapPosition && <Button type="position" onClick={getGeoLocation}>
        {isGeoLocationLoading ? "Loading..." : "Use your position"}
      </Button>}
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
      console.log(e);
      console.log("this will open the form");
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
