import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import MainPage from './MainPage.js';
import logo from "./imgs/logo.png";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (

      <BrowserRouter>

      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App;
