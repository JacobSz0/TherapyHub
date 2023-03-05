import { NavLink } from "react-router-dom";
import { useToken } from "./Authentication.js";
import React, { useState, useEffect } from "react";


function Nav() {
  const { token, logout } = useToken();
  const [role_id, SetRoleId] = useState();
  const [therapistId, setTherapistID] = useState();
  const [accountId, setAccountId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));
  
  
  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    console.log("account_id",info.account.id)
    setAccountId(info.account.id);
    SetRoleId(info.account.role_id);
  }


  useEffect(() => {
    const fetchData = async () => {
    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}therapy`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      for (let key in data) {
        if (data[key]["account_id"] === accountId) {
          setTherapistID(data[key]["id"]);
          console.log("id.......", data[key]["id"])
        }
      }
    }
  };
    fetchData();
    if (token) {
      parseJwt(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token, accountId, therapistId]);

  function handleProfileLinkClick() {
    setTherapistID(therapistId + 1);
  }


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
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
            )}
            {isLoggedIn && role_id === 1 && (
              <li className="nav-item">
                <NavLink className="nav-link" to="client/detail/:id">
                  Profile
                </NavLink>
              </li>
            )}
            {isLoggedIn && role_id === 1 && (
              <li className="nav-item">
                <NavLink className="nav-link" to="client/update">
                  Update Profile
                </NavLink>
              </li>
            )}
            {isLoggedIn && role_id === 1 && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Wishlist/">
                    Wishlist
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && role_id === 2 && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
            )}
            {isLoggedIn && role_id === 2 && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/therapist/detail/${therapistId}`}
                  onClick= {handleProfileLinkClick}
                >
                  Profile
                </NavLink>
              </li>
            )}
            {isLoggedIn && role_id === 2 && (
              <li className="nav-item">
                <NavLink className="nav-link" to="therapist/update">
                  Update Profile
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
