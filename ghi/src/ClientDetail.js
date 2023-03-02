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
<div class="card text-center">
  <div class="card-header">Hello</div>
  <div class="card-body">
    <h5 class="card-title">Welcome back!</h5>
    <p class="card-text">What would you like to do today?</p>
    <a href="/Wishlist" class="btn btn-link">
      View your wishlist
    </a>
    <a href="/client/update" class="btn btn-link">
      Update your account information
    </a>
    <a href="/" class="btn btn-link">
      Browse therapists
    </a>
  </div>
  <div class="card-footer text-muted"></div>
</div>
  );
}

export default ClientLandingPage;
