import { useEffect, useState } from "react";
import { useAuth } from "../Context/LoginProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email.toString().toLowerCase(), password);
    else toast.error("plaese fill in all the fields");
  };

  useEffect(() => {
    if (isAuth) navigate("/", { replace: true });
  }, [isAuth, navigate]);

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder=" email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
