import { NavLink, Link } from "react-router-dom";
import { useToken } from "./Authentication.js";
import React, { useState, useEffect } from 'react';

function Nav() {
  const {token, logout} = useToken();
  const [role_id, SetRoleId] = useState();
  
  
  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    SetRoleId(info.account.role_id)

  }

  useEffect (() => {
      if (token) {
      parseJwt(token);
    }
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          TherapyHub
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/client/login">
                Client
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="account">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/therapist/login">
                Therapist
              </NavLink>
            </li>
            <li className="nav-item">
              {token ? (
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              ): null }
            </li>
            <li className="nav-item">
            {role_id === 2 ?  (
            <NavLink className="nav-link" to="/therapist/login">
              {/* make sure to change the the path to update therapy */}
              Update Profile
            </NavLink>
        ) : null}
        </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
