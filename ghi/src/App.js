import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Wishlist from './Wishlist'
import './App.css';
import ClientSignupForm from './ClientSignupForm.js';
import AccountSignupForm from './AccountSignupForm.js';
import Nav from './Nav.js';
import TherapistList from './TherapistList'
import MainPage from './MainPage.js';


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
  <Nav/>
  <div className="container">
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="account" element={<AccountSignupForm/>}/>
    <Route path="client/new" element={<ClientSignupForm/>}/>
    <Route path="/Wishlist" element={<Wishlist />} />
    <Route path="therapists/" element={<TherapistList therapists={therapists} getTherapists={getTherapists} />} />
  </Routes>
  </div>
  </BrowserRouter>
  )

}

export default App;


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
