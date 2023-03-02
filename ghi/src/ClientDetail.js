import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "./Authentication";

function ClientLandingPage() {
  const [clientInfo, setClientInfo] = useState({});
  const { clientId } = useParams();
  const token = useToken();

  useEffect(() => {
    fetch(`client/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setClientInfo(data))
      .catch((error) => console.error(error));
  }, [clientId, token]);


  return (
<div className="card text-center">
  <div className="card-header">Hello</div>
  <div className="card-body">
    <h5 className="card-title">Welcome back!</h5>
    <p className="card-text">What would you like to do today?</p>
    <a href="/Wishlist" className="btn btn-link">
      View your wishlist
    </a>
    <a href="/client/update" className="btn btn-link">
      Update your account information
    </a>
    <a href="/" className="btn btn-link">
      Browse therapists
    </a>
  </div>
  <div className="card-footer text-muted"></div>
</div>
  );
}

export default ClientLandingPage;
