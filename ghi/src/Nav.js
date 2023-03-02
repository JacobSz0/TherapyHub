import { NavLink } from "react-router-dom";
import { useToken } from "./Authentication.js";
import React, { useState, useEffect } from "react";

function Nav() {
  const { token, logout } = useToken();
  const [role_id, setRoleId] = useState();

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    setRoleId(info.account.role_id);
  }

  useEffect(() => {
    if (token) {
      parseJwt(token);
    }
  }, [token]);

  const isLoggedIn = Boolean(token);

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
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/client/login">
                    Client
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/therapist/login">
                    Therapist
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/account">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && role_id === 1 && (
              <li className="nav-item">
                <NavLink className="nav-link" to="client/detail">
                  Home
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Wishlist">
                    Wishlist
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && role_id === 2 && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/therapist/detail">
                  Profile
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <button className="btn" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
