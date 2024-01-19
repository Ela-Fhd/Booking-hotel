import { useState } from "react";

export default function useGeoLocation() {
  const [error, setError] = useState(null);
  const [geoPosition, setGeoPosition] = useState({});
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);

  function getGeoLocation() {
    if (!navigator.geolocation)
      return setError("your browser doesnt support geoLocation");
    setIsLoadingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoPosition({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        setIsLoadingGeo(false);
      },
      (error) => {
        setError(error.message);
        setIsLoadingGeo(false);
      }
    );
  }

  return { geoPosition, isLoadingGeo, error, getGeoLocation };
}
