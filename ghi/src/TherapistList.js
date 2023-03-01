import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


function TherapistList({ therapists, getTherapists }){


  const [searchParams, setSearchParams] = useSearchParams();
  const [listZipcodes, setListZipcodes] = useState([]);
  const [zip_code, setZipCode] = useState(searchParams.get('zip_code'));
  const [radius, setRadius] = useState(searchParams.get('radius'));


  useEffect(() => {
    const handleSearch = async () => {
      const data = {
        zip_code,
        radius,
      };

      const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}zipcode?zip_code=${zip_code}&radius=${radius}`;
      const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const listZipcodes = await response.json();
        setListZipcodes(listZipcodes);
        console.log(listZipcodes);
      }
    };
    handleSearch();
  }, [zip_code, radius]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ zip_code, radius });
  };

  const handleZipcodeChange = (event) => {
    const value = event.target.value
    setZipCode(value);
  };

  const handleRadiusChange = (event) => {
    const value = event.target.value;
    setRadius(value);
  };

  if (therapists === undefined) {
    return null;
  }


  return (
    <div className="row justify-content-center">
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
          placeholder="Miles"
          aria-label="Search"
          value={radius}
        />
        <label>Radius(Miles)</label>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <p><br></br></p>
      {therapists.filter(therapist => listZipcodes.includes(therapist.zipcode)).map((therapist) => (
        <div key={therapist.id} className="col-sm-10">
          <div className="card bg-light mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={therapist.picture} className="img-fluid rounded-start" alt="Therapist" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{therapist.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {therapist.license_information}
                  </h6>
                  <p className="card-text">
                    {therapist.specialties}
                  </p>
                  <p className="card-text">
                  { therapist.zipcode }
                   , {' '}
                  { therapist.state }
                </p>
                <a href="#" className="btn btn-primary stretched-link">Learn more!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TherapistList;