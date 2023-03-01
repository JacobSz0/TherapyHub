import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Wishlist from "./Wishlist";
import "./App.css";
import ClientSignupForm from "./ClientSignupForm.js";
import AccountSignupForm from "./AccountSignupForm.js";
import TherapistSignupForm from "./TherapistSignupForm";
import Nav from "./Nav.js";
import ClientLoginForm from "./ClientLoginForm.js";
import { useToken, AuthProvider } from "./Authentication.js";
import React, { useState, useEffect } from "react";
import MainPage from "./MainPage.js";
import TherapistLoginForm from "./TherapistLoginForm.js"
import TherapistProfile from "./TherapistProfile";
import TherapistList from "./TherapistList";


function GetToken() {
  useToken();
  return null;
}

function App() {
    const [therapists, setTherapists] = useState([]);


  const getTherapists = async ()=> {
    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}therapy`;

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const therapists = data
      setTherapists(therapists)
    }
  }

  useEffect(() => {
    getTherapists();
  }, []);


  return (
    <BrowserRouter>
        <AuthProvider>
          <GetToken />
        <Nav  />
          <div className="container">
              <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="account" element={<AccountSignupForm />} />
              <Route path="client/:username" element={<ClientSignupForm />} />
              <Route path="/Wishlist" element={<Wishlist />} />
              <Route path="/client/login" element={<ClientLoginForm />} />
              <Route path="/therapist/:username" element={<TherapistSignupForm />} />
              <Route path="/therapist/login" element={<TherapistLoginForm />} />
              <Route path="/therapist/detail/:id" element={<TherapistProfile />} />
              <Route path="therapists/" element={<TherapistList therapists={therapists} getTherapists={getTherapists} />} />
          </Routes>
          </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
