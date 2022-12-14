import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios"
import backImg from "./signimg.jpeg"

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (

    <div class="wrapper--signup">
      <div class="image-holder">
        <img src={backImg} alt="" />
      </div>
      <div class="form-inner">
        <form onSubmit={handleLoginSubmit}>
          <div class="form-header">
            <h1>Login</h1>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input 
            class="form-control"
            type="email" name="email" value={email} onChange={handleEmail} />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input
            class="form-control"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <button className="create-acc-btn" type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="to-login">
          <p>Don't have an account yet?</p>
          <Link className="login-btn" to={"/signup"}> Sign Up</Link>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;
