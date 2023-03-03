import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import TherapistLoginForm from "./TherapistLoginForm.js";
import TherapistProfile from "./TherapistProfile";
import TherapistList from "./TherapistList";
import TherapistUpdateForm from "./TherapistUpdateForm";
import ClientUpdateForm from "./ClientUpdateForm";
import ClientDetail from "./ClientDetail";

function GetToken() {
  useToken();
  return null;
}

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="account" element={<AccountSignupForm />} />
            <Route path="client/:username" element={<ClientSignupForm />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/client/login" element={<ClientLoginForm />} />
            <Route
              path="/therapist/:username"
              element={<TherapistSignupForm />}
            />
            <Route path="/therapist/login" element={<TherapistLoginForm />} />
            <Route
              path="/therapist/detail/:id"
              element={<TherapistProfile />}
            />
            <Route path="/therapists/"element={<TherapistList />} />
            <Route path="therapist/update" element={<TherapistUpdateForm />} />
            <Route path="/client/update" element={<ClientUpdateForm />} />
            <Route path="/client/detail/:id" element={<ClientDetail />} />
            <Route
              path="/therapist/detail"
              element={<TherapistProfile />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
