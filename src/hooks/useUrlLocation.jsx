import { useSearchParams } from "react-router-dom";

export default function useUrlLocation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const long = searchParams.get("long");
  const lat = searchParams.get("lat");
  return [lat, long];
}
