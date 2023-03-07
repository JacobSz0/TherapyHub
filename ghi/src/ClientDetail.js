import React, { useState, useEffect } from "react";
import { useToken } from "./Authentication";

function ClientLandingPage() {
  const [client, setClient] = useState({});
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
            setClient(data[key]);
          }
        }
      }
    }
    if (account_id) {
      fetchData();
    }
  }, [account_id]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-7 card text-center">
            <h1>Welcome back, {client.name}!</h1>
            <div className="card text-left">
              <p></p>
              <p></p>
              <p></p>
              <h4 className="card-text">What would you like to do today?</h4>
              <a href="/Wishlist">You can view your wishlist here</a>
              <a href="/">Haven't found a therapist you absolutely love? Keep browsing!</a>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Account details:</h4>
                <p className="card-text">Name: {client.name}</p>
                <p className="card-text">City: {client.city}</p>
                <p className="card-text">State: {client.state}</p>
                <p className="card-text">Zip Code: {client.zipcode}</p>
                <p className="card-text">Notes: {client.additional_notes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientLandingPage;
