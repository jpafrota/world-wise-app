import { useNavigate, useSearchParams } from "react-router";
import styles from "./Map.module.css";
import Sidebar from "./Sidebar";
import Button from "./Button";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function handleClick() {
    setSearchParams({ lat: "23", lng: "50" });
  }

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <Button onClick={handleClick} type="position">
        Change pos
      </Button>
    </div>
  );
}

export default Map;
