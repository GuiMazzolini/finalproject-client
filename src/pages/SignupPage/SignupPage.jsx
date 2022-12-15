import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import backImg from "./signimg.jpeg"

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${API_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
<div class="wrapper--signup">
			<div class="image-holder">
				<img src={backImg} alt=""/>
			</div>

			<div class="form-inner">
				<form onSubmit={handleSignupSubmit}>
					<div class="form-header">
						<h3>Sign up</h3>
					</div>
					<div class="form-group">
						<label for="">Username:</label>
						<input type="text" class="form-control" name="name" value={name} onChange={handleName} />
					</div>
					<div class="form-group">
						<label>E-mail:</label>
						<input type="email" name="email" value={email} onChange={handleEmail} class="form-control" />
					</div>
					<div class="form-group" >
						<label>Password:</label>
						<input type="password" class="form-control" value={password} onChange={handlePassword} />
					</div>
					<button className="create-acc-btn" type="submit">Create my account</button>
				</form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <div className="to-login">
          <h6>Already have an account?</h6>
          <Link className="login-btn" to={"/login"}>Login</Link>
        </div>
      </div>
		</div>
  );
}

export default SignupPage;