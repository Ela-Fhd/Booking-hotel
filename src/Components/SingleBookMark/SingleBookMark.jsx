import { useNavigate, useParams } from "react-router-dom";
import { useBookMarks } from "../Context/BookMarkProvider";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import ReactCountryFlag from "react-country-flag";

function SingleBookMark() {
  const { id } = useParams();
  const { currentBookMark, isLoading, getBookMark } = useBookMarks();

  useEffect(() => {
    getBookMark(id);
  }, [id]);

  const navigate = useNavigate();
  const handleToBack = () => {
    navigate(-1);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <button onClick={handleToBack} className="btn btn--back">
        &larr; Back
      </button>
      <h2 className="cityName">{currentBookMark.cityName}</h2>
      <div className="bookmarkItem">
        <div>
          <ReactCountryFlag
            svg
            countryCode={currentBookMark.countryCode}
            className="countryFlag"
          />
          &nbsp; <strong>{currentBookMark.cityName}</strong> &nbsp;
          <span>{currentBookMark.country}</span>
        </div>
      </div>
    </>
  );
}

export default SingleBookMark;
