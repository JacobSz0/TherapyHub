import React, {useState, useEffect } from 'react';
import logo from "./imgs/logo.png";
import { Link, useNavigate} from 'react-router-dom';
//import $ from 'jquery';


function MainPage() {
  const [zip_code, setZip_code] = useState("");
  const [radius, setRadius] = useState("")




  // const selectRef = useRef(null);

  // useEffect(() => {
  //   $(selectRef.current).multiselect();
  // }, []);
  /* create a post request for the parameters of the zipcode and radius and unit (default miles)
  create a new variable with the list of the results from the post
  maybe if response.ok create variable
  */

  // const handleSearch = async (event) => {
  //   event.preventDefault();
  //   const data = {};
  //   data.zip_code = zip_code;
  //   data.radius = radius

  //   const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}zipcode?zip_code=${zip_code}&radius=${radius}`;
  //   const fetchConfig = {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   const response = await fetch(url, fetchConfig);
  //   console.log(response)
  //   if (response.ok) {
  //     const listZipcodes = await response.json()
  //     console.log(listZipcodes)
  //   }
  // }
    const navigate = useNavigate();

    const handleSearch = async (event) => {
    event.preventDefault();
      navigate(`/therapists?zip_code=${zip_code}&radius=${radius}`)
    // const data = {};
    // data.zip_code = zip_code;
    // data.radius = radius

    // const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}zipcode?zip_code=${zip_code}&radius=${radius}`;
    // const fetchConfig = {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    // const response = await fetch(url, fetchConfig);
    // console.log(response)
    // if (response.ok) {
    //   const listZipcodes = await response.json()
    //   console.log(listZipcodes)
    // }
  }


  const handleZipcodeChange = (event) => {
    const value = event.target.value;
    setZip_code(value);
  }

  const handleRadiusChange = (event) => {
    const value = event.target.value;
    setRadius(value);
  }


  return (



<div className="px-4 py-5 my-5 text-center">
  <img
    src={logo}
    className="img-fluid mx-auto d-block"
    alt="Responsive image"
    style={{ height: "600px" }}
  />
  <form onSubmit={handleSearch} className="form-inline mt-3">
    <input
      onChange={handleZipcodeChange}
      className="form-control mr-sm-2 search-input"
      type="search"
      placeholder="Zipcode"
      aria-label="Search"
      value={zip_code}
    />
    <input
      onChange={handleRadiusChange}
      className="form-control mr-sm-2 search-input"
      type="search"
      placeholder="Radius(Miles)"
      aria-label="Search"
      vallue={radius}
    />
    {/* <Link to="/therapists"> */}
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
      Search
      </button>
    {/* </Link> */}
  </form>
</div>

/* for the submit button, When I attach the zipcode api to the button,
do a onClick or onChange or w/e it is so that when someone hits submit,
it creates a variable that contains the list of zip codes and we use that
for the filter. I just have to figure out how to attach that list to the
person's token and it deletes when the person logs out or closes the site.
*/
);
}

export default MainPage;


//   <div className="px-4 py-5 my-5 text-center">
    //  <h1 className="display-5 fw-bold">TherapyHub</h1>
    //   <div className="col-lg-6 mx-auto">
    //     <p className="lead mb-4">
    //       Find your Therapist Today!
    //     </p>
    //   </div>
    // </div>
    //    <select id="example-multiple-selected" multiple ref={selectRef}>
    //   <option value="1">Option 1</option>
    //   <option value="2" selected>Option 2</option>
    //   <option value="3" selected>Option 3</option>
    //   <option value="4">Option 4</option>
    //   <option value="5">Option 5</option>
    //   <option value="6">Option 6</option>
    // </select>
