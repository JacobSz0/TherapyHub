import React, { useState } from "react";

function ClientLoginForm({ getUsers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.email = email;
    data.password = password;

    const usersUrl = "http://localhost:8080/client/login";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(usersUrl, fetchConfig);
    if (response.ok) {
      const newUser = await response.json();
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Client Log In</h1>
          <form onSubmit={handleSubmit} id="login-client-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleEmailChange}
                placeholder="You@email.com"
                required
                type="email"
                name="email"
                id="email"
                className="form-control"
                value={email}
              />
              <label htmlFor="email">email</label>
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
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ClientLoginForm;
