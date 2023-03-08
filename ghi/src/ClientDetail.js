import React, { useState, useEffect } from "react";
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
      <div className="col-sm-4">
        <div className="card text-center">
          <div className="card-body">
            {/* <img
              src="https://cdn.vectorstock.com/i/preview-1x/29/75/hand-drawn-doodle-simple-set-of-gender-related-vector-45002975.jpg"
              className="img-thumbnail"
              alt="..."
              width="200">
            </img> */}
            <p></p>
            <h4 className="card-title"><strong>Account details:</strong></h4>
            <p className="card-text"><strong>Name:</strong> {client_id.name}</p>
            <p className="card-text"><strong>City:</strong> {client_id.city}</p>
            <p className="card-text"><strong>State:</strong> {client_id.state}</p>
            <p className="card-text"><strong>Zip Code:</strong> {client_id.zipcode}</p>
            <p className="card-text"><strong>Notes:</strong> {client_id.additional_notes}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-7">
        <div className="card text-center">
          <div className="card-body">
            <p></p>
            <p></p>
            <p></p>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/008/652/535/small/yoga-lotus-pose-icon-logo-concept-meditation-yoga-minimal-symbol-health-spa-meditation-harmony-zen-logotype-creative-graphic-sign-design-template-vector.jpg" alt="..." width="225"></img>
            <h1>Welcome back, {client_id.name}!
            </h1>
            <p></p>
              <h5 className="card-text">What would you like to do today?</h5>
              <p></p>
              <a href="/Wishlist">You can view your wishlist here</a>
              <p></p>
              <a href="/">Haven't found a therapist you absolutely love? Keep browsing!</a>
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
