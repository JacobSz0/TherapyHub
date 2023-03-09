import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "./Authentication";

function ClientLandingPage() {
  const [client_id, setClient_id] = useState({});
  const { token } = useToken();
  const [account_id, setAccountId] = useState();

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    return info.account.id;
  }

  useEffect(() => {
    async function getData() {
      if (token) {
        const acc_id = parseJwt(token);
        setAccountId(acc_id);
      }
    }
    getData();
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}client`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        for (let key in data) {
          if (data[key]["account_id"] === account_id) {
            setClient_id(data[key]);
          }
        }
      }
    }
    if (account_id) {
      fetchData();
    }
  }, [account_id]);

  return (
    <div className="row">
      <div className="col-md-7 col-lg-3">
        <div className="card text-left shadow p-4 mt-4">
          <div className="card-body pt-0">
            <h4 className="card-title"><strong>Account Details:</strong></h4>
            <p></p>
            <p className="card-text"><strong>Name:</strong> {client_id.name}</p>
            <p className="card-text"><strong>City:</strong> {client_id.city}</p>
            <p className="card-text"><strong>State:</strong> {client_id.state}</p>
            <p className="card-text"><strong>Zip Code:</strong> {client_id.zipcode}</p>
            <p className="card-text"><strong>Notes:</strong> {client_id.additional_notes}</p>
          </div>
        </div>
      </div>

      <div className="col-sm-9">
        <div className="card text-center shadow p-4 mt-4">
          <div className="card-body">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/008/652/535/small/yoga-lotus-pose-icon-logo-concept-meditation-yoga-minimal-symbol-health-spa-meditation-harmony-zen-logotype-creative-graphic-sign-design-template-vector.jpg" alt="..." width="150"></img>
            <h1>Welcome, {client_id.name}!
            <p></p>
            It's really good to see you.
            </h1>
              <p></p>
              <NavLink
              className="nav-link"
              to="/">
                <p>Let's find you the perfect therapist!</p>
              </NavLink>
              <p></p>
              <p></p>
              <p></p>
          </div>
            </div>
          </div>
        </div>
  );
}

export default ClientLandingPage;
