import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSearchParams } from "react-router";
import { useCities } from "../context/useCities";
import styles from "./Map.module.css";

function Map() {
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([0, 40]);
  const { cities } = useCities();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (!mapLat || !mapLng) return;

    setMapPosition([Number(mapLat), Number(mapLng)]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
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
        <ChangeCity position={mapPosition}></ChangeCity>
      </MapContainer>
    </div>
  );
}

function ChangeCity({ position }) {
  const map = useMap();

  map.setView(position);

  return null;
}

export default Map;
