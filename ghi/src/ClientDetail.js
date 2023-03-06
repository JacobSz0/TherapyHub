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
    return info.account.id; // Return the account ID
  }

  useEffect(() => {
    async function getData() {
      if (token) {
        const acc_id = parseJwt(token);
        setAccountId(acc_id); // Update the account ID state
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
            setClient_id(data[key]); // Update the client ID state with the correct client
          }
        }
      }
    }
    if (account_id) {
      fetchData(); // Only fetch the data when the account ID state is set
    }
  }, [account_id]);

  return (
    <div className="row">
      <p>
        {" "}
        <br></br>{" "}
      </p>
      <div className="card" style={{ width: `${window.innerWidth > 768 ? "50%" : "100%"}` }}>
  <div className="card-body">
    <div className="d-flex flex-column align-items-center text-center">
      <h3>Hello,</h3>
      <div className="mt-3">
        <p className="text-secondary mb-1">{client_id.name}</p>
        <p className="text-muted font-size-sm">
          {client_id.city}, {client_id.state}, {client_id.zipcode}
        </p>
      </div>
    </div>
  </div>
</div>

          <p></p><p></p>
                    <div className="card text-center">
  <div className="card-header"></div>
  <div className="card-body">
    <h5 className="card-title">Welcome back!</h5>
    <p className="card-text">
      What would you like to do today?
    </p>
    <a href="/Wishlist" className="btn btn-link">
      View your wishlist
    </a>
    <a href="/" className="btn btn-link">
      Browse therapists
    </a>
  </div>
  <div className="card-footer text-muted"></div>
</div>
</div>

  );
}

export default ClientLandingPage;
