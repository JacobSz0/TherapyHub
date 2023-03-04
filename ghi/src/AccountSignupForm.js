import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./Authentication";

function AccountSignupForm() {
  const [roleIds, setRoleIds] = useState([]);
  const [role_id, setRoleId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleRoleIdChange = (event) => {
    const value = event.target.value;
    setRoleId(value);
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = username;
    data.email = email;
    data.password = password;
    data.role_id = role_id;

    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}api/accounts`;

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      login(username, password);
      setUsername("");
      setEmail("");
      setPassword("");
      setRoleId("");

      const account = await response.json();
      const NewUsername = account.account.username;
      if (account.account.role_id === 1) {
        navigate(`/client/${NewUsername}`);
      } else {
        navigate(`/therapist/${NewUsername}`);
      }
    }
  };

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}role`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setRoleIds(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create account</h1>
            <form onSubmit={handleCreateAccount} id="create-new-client-form">
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
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleEmailChange}
                  placeholder="email"
                  required
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={email}
                  autoComplete="username"
                />
                <label htmlFor="email">email@example.com</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handlePasswordChange}
                  placeholder="password"
                  required
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={password}
                  autoComplete="email"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div>
                <select
                  onChange={handleRoleIdChange}
                  required
                  name="role_id"
                  id="role_id"
                  className="form-select"
                  autoComplete="current-password"
                >
                  <option>Choose role</option>
                  {roleIds.map((role, index) => (
                    <option key={index} value={role.id}>
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>
              <p>
                {" "}
                <br></br>
              </p>
              <div>
                <button className="btn btn-outline-info my-2 my-sm-0">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSignupForm;
