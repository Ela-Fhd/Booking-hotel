import { Link, useNavigate } from "react-router-dom";
import { useBookMarks } from "../Context/BookMarkProvider";
import ReactCountryFlag from "react-country-flag";
import Loading from "../Loading/Loading";
import { HiTrash } from "react-icons/hi2";

function BookMarks() {
  const navigate = useNavigate();
  const { bookmarks, isLoading, currentBookMark, deleteBookmark } =
    useBookMarks();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loading />;
  if (!bookmarks.length) {
    return (
      <>
        <p className="emptyBookmark"> There are No Bookmarks</p>
        <button
          className="btn btn-add"
          onClick={() =>
            navigate("add", {
              state: { message: "please click on map and choose location" },
            })
          }
        >
          Add New
        </button>
      </>
    );
  }

  return (
    <>
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h2 className="bookmarkListHeader">Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&long=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookMark.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag
                    svg
                    countryCode={item.countryCode}
                    className="countryFlag"
                  />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default BookMarks;
