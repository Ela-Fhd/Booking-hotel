import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useHotels } from "../Context/HotelProvider";

function Hotels() {
  const { isLoading, data, currentHotel } = useHotels();
  const navigate = useNavigate();

  if (isLoading) <Loading />;
  return (
    <>
      <button
        className="btn btn--back"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </button>
      <div className="searchList">
        <h2>Search Result ({data.length})</h2>
        {data.map((item) => {
          return (
            <Link
              to={`/hotels/${item.id}?lat=${item.latitude}&long=${item.longitude}`}
              key={item.id}
            >
              <div
                className={`searchItem ${
                  item.id === currentHotel?.id ? "current-hotel" : ""
                } `}
              >
                <img src={item.picture_url.url} alt={item.name} />
                <div className="searchItemDesc">
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
    </>
  );
}

export default Hotels;
