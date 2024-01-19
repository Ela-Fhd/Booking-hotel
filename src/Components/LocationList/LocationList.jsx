import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading/Loading";

function LocationList() {
  const { isLoading, data } = useFetch("http://localhost:5000/hotels");

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      {isLoading && <Loading />}
      <div className="locationList">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`hotels/${item.id}?lat=${item.latitude}&long=${item.longitude}`}
            >
              <div className="locationItem">
                <img src={item.picture_url.url} alt={item.name} />
                <div className="locationItemDesc">
                  <p className="location">{item.smart_location}</p>
                  <p className="name">{item.name}</p>
                  <p className="price">
                    $&nbsp;{item.price}&nbsp;
                    <span>night</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
