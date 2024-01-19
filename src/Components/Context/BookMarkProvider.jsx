// import { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";

// const bookmarkContext = createContext();
// const URL = "http://localhost:5000/bookmarks";

// export default function BookMarkProvider({ children }) {
//   const [currentBookMark, setCurrentBookMark] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [bookmarks, setBookmarks] = useState([]);

//   useEffect(() => {
//     async function fetchBookmarks() {
//       setIsLoading(true);
//       try {
//         const { data } = await axios.get(`${URL}`);
//         setBookmarks(data);
//       } catch (error) {
//         toast.error(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchBookmarks();
//   }, []);

//   async function getBookMark(id) {
//     try {
//       const { data } = await axios.get(`${URL}/${id}`);
//       setCurrentBookMark(data);
//     } catch (error) {
//       toast.error(error.massage);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function createBookmark(newBookmark) {
//     setIsLoading(true);
//     try {
//       const { data } = await axios.post(`${URL}`, newBookmark);
//       setBookmarks((prev) => [...prev, data]);
//       setCurrentBookMark(data);
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function deleteBookmark(id) {
//     setIsLoading(true);
//     try {
//       axios.delete(`${URL}/${id}`);
//       setBookmarks((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <bookmarkContext.Provider
//       value={{
//         bookmarks,
//         isLoading,
//         currentBookMark,
//         getBookMark,
//         createBookmark,
//         deleteBookmark,
//       }}
//     >
//       {children}
//     </bookmarkContext.Provider>
//   );
// }

// export const useBookMarks = () => useContext(bookmarkContext);

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import toast from "react-hot-toast";
import axios from "axios";

const bookmarkContext = createContext();
const URL = "http://localhost:5000/bookmarks";

const initial_state = {
  isLoading: false,
  bookmarks: [],
  currentBookMark: {},
  error: null,
};

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookMark: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookMark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookMark: null,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("unknown action");
  }
};

export default function BookMarkProvider({ children }) {
  //   const [currentBookMark, setCurrentBookMark] = useState({});
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [bookmarks, setBookmarks] = useState([]);

  const [{ isLoading, bookmarks, currentBookMark }, dispatch] = useReducer(
    bookmarkReducer,
    initial_state
  );

  useEffect(() => {
    async function fetchBookmarks() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${URL}`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "an error acurred in fetching all bookmarks!",
        });
        toast.error(error.message);
      }
    }
    fetchBookmarks();
  }, []);

  async function getBookMark(id) {
    if (Number(id) === currentBookMark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${URL}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "an error accured in fetch one bookmark!",
      });
      toast.error(error.massage);
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${URL}`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "an error accured in create bookmark!",
      });
      toast.error(error.message);
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      axios.delete(`${URL}/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "an error accured in delete bookmark!",
      });
      toast.error(error.message);
    }
  }

  return (
    <bookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        currentBookMark,
        getBookMark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </bookmarkContext.Provider>
  );
}

export const useBookMarks = () => useContext(bookmarkContext);
