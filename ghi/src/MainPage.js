import React, { useState } from 'react';
import logo from "./imgs/logo.png";
import { useNavigate } from 'react-router-dom';


function MainPage() {
  const [zip_code, setZip_code] = useState("");
  const [radius, setRadius] = useState("")
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
      navigate(`/therapists?zip_code=${zip_code}&radius=${radius}`)
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
    <div className="container max-width-lg">
      <div className="px-4 py-5 my-5 text-center">
        <img
          src={logo}
          className="mx-auto d-block"
          alt=""
          style={{ objectFit: "contain", width: "90%", height: "90%" }}
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
          <label>Zipcode</label>

          <input
            onChange={handleRadiusChange}
            className="form-control mr-sm-2 search-input"
            type="search"
            placeholder="Radius(Miles)"
            aria-label="Search"
            value={radius}
          />
          <label>Radius(Miles)</label>

          <button className="btn btn-outline-info my-2 my-sm-0" type="submit">
            Find Your Therapist!
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;
