import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import MainPage from './MainPage.js';
import logo from "./imgs/logo.png";
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
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //     console.log('fastapi url: ', url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, [])


  // return (
  //   <div>
  //     <ErrorNotification error={error} />
  //     <Construct info={launch_info} />
  //   </div>
  // );
}

export default App;
