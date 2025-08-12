import { useSearchParams } from "react-router";

export function useURLPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function setURLPosition({ lat, lng }) {
    setSearchParams({ lat, lng });
  }

  return { position: [lat, lng], setURLPosition };
}
