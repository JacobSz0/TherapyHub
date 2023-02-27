import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Wishlist from "./Wishlist";
import "./App.css";
import ClientSignupForm from "./ClientSignupForm.js";
import AccountSignupForm from "./AccountSignupForm.js";
import Nav from "./Nav.js";
import ClientLoginForm from "./ClientLoginForm.js";
import { useToken } from "./Authentication.js";


function GetToken() {
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="account" element={<AccountSignupForm />} />
          <Route path="client/new" element={<ClientSignupForm />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/client/login" element={<ClientLoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
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
