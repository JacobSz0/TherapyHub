import { NavLink } from "react-router-dom";
import { useToken } from "./Authentication.js";

function Nav() {
  const {token, logout} = useToken();
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
