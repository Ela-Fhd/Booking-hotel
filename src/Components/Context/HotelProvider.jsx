import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const URL = "http://localhost:5000/hotels";

export function HotelProvider({ children }) {
  const [serachParams, setSearchParams] = useSearchParams();
  const room = JSON.parse(serachParams.get("options"))?.room;
  const destination = serachParams.get("destination");
  const [currentHotelLoading, setCurrentHotelLoading] = useState(false);
  const [currentHotel, setCurrentHotel] = useState({});

  // fetch filtered data from database
  const { isLoading, data } = useFetch(
    URL,
    `q=${destination || ""}&accommodates_gte=${room}`
  );
  // _gte , _like =>  _gte , _like are an option for json server

  async function getHotel(id) {
    setCurrentHotelLoading(true);
    try {
      const { data } = await axios.get(`${URL}/${id}`);
      setCurrentHotel(data);
      setCurrentHotelLoading(false);
    } catch (error) {
      toast.error(error.massage);
      setCurrentHotelLoading(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{ isLoading, data, getHotel, currentHotel, currentHotelLoading }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export const useHotels = () => useContext(HotelContext);
