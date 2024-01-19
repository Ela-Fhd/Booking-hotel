import { useLocation, useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import Loading from "../Loading/Loading";
import { useBookMarks } from "../Context/BookMarkProvider";

const BASE_URL_GEO = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddBookMark() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lat, long] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [error, setError] = useState(null);
  const { createBookmark } = useBookMarks();

  useEffect(() => {
    if (!lat || !long) return;

    async function getLocationInfo() {
      setIsLoadingGeo(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `${BASE_URL_GEO}?latitude=${lat}&longitude=${long}`
        );
        if (!data.countryCode)
          throw new Error("this place is not city! please click somewhere");
        setCityName(data.city);
        setCountryName(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingGeo(false);
      }
    }
    getLocationInfo();
  }, [lat, long]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !countryName || !lat || !long) return;

    const new_bookmark = {
      cityName,
      country: countryName,
      countryCode,
      latitude: lat,
      longitude: long,
      host_location: cityName + " " + countryName,
    };

    await createBookmark(new_bookmark);
    navigate("/bookmarks");
  };

  if (isLoadingGeo) return <Loading />;
  if (error) return <p className="placeError">{error}</p>;
  if (!lat || !long)
    return <p className="placeError">{location.state.message}</p>;

  return (
    <div>
      <h2>Bookmark new Location</h2>
      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">city name</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="countryName">country name</label>
          <input
            type="text"
            name="countryName"
            id="countryName"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
          <ReactCountryFlag
            className="flag"
            svg
            countryCode={countryCode || "US"}
          />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">add</button>
        </div>
      </form>
    </div>
  );
}

export default AddBookMark;
