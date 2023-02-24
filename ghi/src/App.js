import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import MainPage from './MainPage.js';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TherapistList from './TherapistList'

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

      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="therapists/" element={<TherapistList therapists={therapists} getTherapists={getTherapists} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App;
