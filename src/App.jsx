import "./App.css";
import LocationList from "./Components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import Hotels from "./Components/Hotels/Hotels";
import SingleHotel from "./Components/SingleHotel/SingleHotel";
import AppLayout from "./Components/AppLayout/AppLayout";
import MainLayout from "./Components/MainLayout/MainLayout";
import { HotelProvider } from "./Components/Context/HotelProvider";
import BookMarkLayout from "./Components/BookMarkLayout/BookMarkLayout";
import BookMarks from "./Components/BookMarks/BookMarks";
import AddBookMark from "./Components/AddBookMark/AddBookMark";
import BookMarkProvider from "./Components/Context/BookMarkProvider";
import SingleBookMark from "./Components/SingleBookMark/SingleBookMark";
import Login from "./Components/Login/Login";
import LoginProvider from "./Components/Context/LoginProvider";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
function App() {
  return (
    <>
      <LoginProvider>
        <BookMarkProvider>
          <HotelProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LocationList />} />
                <Route path="/hotels" element={<AppLayout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <Hotels />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":id"
                    element={
                      <ProtectedRoute>
                        <SingleHotel />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/bookmarks" element={<BookMarkLayout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <BookMarks />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="add"
                    element={
                      <ProtectedRoute>
                        <AddBookMark />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":id"
                    element={
                      <ProtectedRoute>
                        <SingleBookMark />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </HotelProvider>
        </BookMarkProvider>
      </LoginProvider>
    </>
  );
}

export default App;
