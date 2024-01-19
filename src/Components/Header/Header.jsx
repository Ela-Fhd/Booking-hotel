import React, { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiSearch, HiMinus, HiPlus } from "react-icons/hi";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { AiOutlineLogout } from "react-icons/ai";

import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../Context/LoginProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [guestOption, setGuestOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleCount = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const dateRef = useRef();
  useOutSideClick(dateRef, () => setOpenDate(false), "dateDropDown");

  const navigate = useNavigate();
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });

    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <UserLogin />
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            value={destination}
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
            onChange={(e) => setDestination(e.target.value)}
          />
          <div className="seperator"></div>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            className="dateDropDown"
            id="dateDropDown"
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(date[0].startDate, "yyyy,MM,dd")} to ${format(
              date[0].endDate,
              "yyyy,MM,dd"
            )}`}
          </div>

          <div ref={dateRef}>
            {openDate && (
              <DateRange
                className="date"
                ranges={date}
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            )}
          </div>

          <div className="seperator"></div>
        </div>
        <div className="headerSearchItem">
          <div
            className="optionDropDown"
            id="optionDropDown"
            onClick={() => setGuestOption(!guestOption)}
          >
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {guestOption && (
            <GuestOption
              options={options}
              handleCount={handleCount}
              setGuestOption={setGuestOption}
            />
          )}
          <div className="seperator"></div>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch />
          </button>
        </div>
      </div>
      <Link to="/" className="homeLink">
        Home
      </Link>
      <Link to="/bookmarks" className="bookmarksLink">
        Bookmarks
      </Link>
    </div>
  );
}

export default Header;

function GuestOption({ options, handleCount, setGuestOption }) {
  const optionRef = useRef();
  useOutSideClick(optionRef, () => setGuestOption(false), "optionDropDown");
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        type="adult"
        minLimit="1"
        options={options}
        handleCount={handleCount}
      />
      <OptionItem
        type="children"
        minLimit="0"
        options={options}
        handleCount={handleCount}
      />
      <OptionItem
        type="room"
        minLimit="1"
        options={options}
        handleCount={handleCount}
      />
    </div>
  );
}

function OptionItem({ type, options, minLimit, handleCount }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handleCount(type, "dec")}
          disabled={options[type] <= minLimit ? true : false}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleCount(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function UserLogin() {
  const { user, isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {isAuth ? (
        <div className="userLoginInfo">
          <button className="logoutIcon" onClick={handleLogout}>
            <AiOutlineLogout />
          </button>
          <span className="userName">{user.name}</span>
        </div>
      ) : (
        <Link to="/login" className="btn loginLink">
          Login
        </Link>
      )}
    </>
  );
}
