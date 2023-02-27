import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function TherapistList({ therapists, getTherapists }){
  const [searchParams, setSearchParams] = useSearchParams();
  const zip_code = searchParams.get("zip_code")
  console.log(searchParams.entries())
  const radius = searchParams.get("radius")

  useEffect(() => {
    const handleSearch = async () => {
    const data = {};
    data.zip_code = zip_code;
    data.radius = radius

    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}zipcode?zip_code=${zip_code}&radius=${radius}`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    console.log(response)
    if (response.ok) {
      const listZipcodes = await response.json()
      console.log(listZipcodes)
    }}
    handleSearch();
  },[]);


  if (therapists === undefined) {
     return null
  }

  const cardStyle = {
    margin: '10px',
    padding: '10px',
  };

  return (
    <div className="row justify-content-center">
      {therapists?.map((therapist) => (
        <div key={therapist.id} className="col-sm-10">
          <div className="card bg-light mb-3" style={cardStyle}>
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