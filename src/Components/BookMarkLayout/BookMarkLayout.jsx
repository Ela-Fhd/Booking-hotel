import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookMarks } from "../Context/BookMarkProvider";
import Loading from "../Loading/Loading";

function BookMarkLayout() {
  const { bookmarks, isLoading } = useBookMarks();

  if (isLoading) return <Loading />;

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocation={bookmarks} />
    </div>
  );
}

export default BookMarkLayout;
