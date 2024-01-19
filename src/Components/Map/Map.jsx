import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

function Map({ markerLocation: data }) {
  const [centerPosition, setCenterPosition] = useState([50, 4]);
  const { geoPosition, isLoadingGeo, error, getGeoLocation } = useGeoLocation();

  const [lat, long] = useUrlLocation();

  useEffect(() => {
    if (lat && long) {
      setCenterPosition([lat, long]);
    }
  }, [lat, long]);

  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.long) {
      setCenterPosition([geoPosition.lat, geoPosition.long]);
    }
  }, [geoPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        center={centerPosition}
        zoom={13}
        scrollWheelZoom={true}
        className="map"
      >
        <button onClick={getGeoLocation} className="getLocation">
          {error}
          {isLoadingGeo ? "loading..." : "use your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={centerPosition} />
        <DetectClick />
        {data.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return <Marker position={position}></Marker>;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      navigate(`/bookmarks/add?lat=${lat}&long=${lng}`);
    },
  });
};
