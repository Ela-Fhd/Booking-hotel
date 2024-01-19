import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const loginContext = createContext();
const initial_state = {
  user: null,
  isAuth: false,
};

const fake_user = {
  name: "Test",
  email: "test@gmail.com",
  password: "12345",
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isAuth: true,
        user: action.payload,
      };
    case "logout":
      return {
        isAuth: false,
        user: null,
      };
    default:
      throw new Error("Unknown action!");
  }
};

export default function LoginProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(loginReducer, initial_state);

  const login = (email, password) => {
    if (email === fake_user.email && password === fake_user.password) {
      dispatch({ type: "login", payload: fake_user });
      toast.success("You have successfully logged in");
    } else {
      toast.error("email or password is wrong!");
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <loginContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </loginContext.Provider>
  );
}

export const useAuth = () => useContext(loginContext);
