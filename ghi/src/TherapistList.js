import React, { useState, useEffect } from 'react';

function TherapistList({ therapists, getTherapists }){
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