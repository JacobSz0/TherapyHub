import React, { useState } from "react";
import { useToken } from "./Authentication.js";
import { useNavigate } from "react-router-dom";

function ClientLoginForm() {
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
  try {
    const response = await login(username, password);
    navigate("/client/detail/:id");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Client Login</h1>
          <form onSubmit={handleSubmit} id="login-client-form">
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
            <button className="btn btn-outline-info my-2 my-sm-0" type="submit">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => (window.location.href = `/account`)}
            >
              Don't have an account? Register here!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientLoginForm;
