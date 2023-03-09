import React, { useState } from "react";
import { useToken } from "./Authentication.js";
import { useNavigate, NavLink } from 'react-router-dom';

function TherapistLoginForm() {
  const { login } = useToken();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(username, password);
    navigate(`/`)
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Therapist Login</h1>
          <form onSubmit={handleSubmit} id="login-therapist-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleUsernameChange}
                placeholder="username"
                required
                type="text"
                name="username"
                id="username"
                className="form-control"
                value={username}
                autoComplete="username"
              />
              <label htmlFor="username">username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePasswordChange}
                placeholder="SuperSecret#1"
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={password}
                autoComplete="current-password"
              />
              <label htmlFor="password">password</label>
            </div>
            <button
              className="btn btn-outline-info my-2 my-sm-0"

            >
              Submit
            </button>
            <div>
              <NavLink to="/account"
                className="btn btn-light">
                  Don't have an account? Register here!</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TherapistLoginForm;
