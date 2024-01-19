import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useHotels } from "../Context/HotelProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();

  const { getHotel, currentHotelLoading, currentHotel: data } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  const navigate = useNavigate();

  const handleToBack = () => {
    navigate(-1);
  };

  if (currentHotelLoading) return <Loading />;

  return (
    <>
      <button onClick={handleToBack} className="btn btn--back">
        &larr; Back
      </button>
      <div className="room">
        <div className="roomDetail">
          <h2>{data.name}</h2>
          <div>
            {data.number_of_reviews} reviews &bull; {data.smart_location}
          </div>
          <img src={data.xl_picture_url} alt={data.name} />
        </div>
      </div>
    </>
  );
}

export default SingleHotel;
