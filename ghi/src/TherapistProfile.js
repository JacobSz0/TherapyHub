import React, { useState, useEffect } from 'react';
import { useToken } from "./Authentication";
import { useParams } from "react-router-dom";

function  TherapistProfile (){

  const [therapist, setTherapistDetail] = useState({});
  const {id} = useParams();
  const { token, login } = useToken();


  const fetchTherapist = async () => {
    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}therapy/${id}`
    const response = await fetch (url)
        if (response.ok){
            const data = await response.json();
            console.log("data******",data)
            setTherapistDetail(data)
  }
  
  

  }
  useEffect (() => {
        fetchTherapist();
    }, [])
 return (
  <div className="row">
  <p> <br></br> </p>
  <h1 className="text-center">Therapist Profile</h1>
  <div className="row justify-content-center">
        <div className="col-sm-10">
          <div className="card bg-light mb-3">
            <div className="row g-0">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <img src={therapist.picture} className="col-md-4 d-flex justify-content-center align-items-center" alt="Therapist" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
              <div className="form-floating mb-3">
              <input
                defaultValue={therapist.name}
                placeholder="Name"
                required
                type="text"
                name="Name"
                id="Name"
                className="form-control"
              />
              <label htmlFor="Name">Name</label>
              </div>
              <div className="form-floating mb-3">
              <input
                defaultValue={therapist.license_information}
                placeholder="license_information"
                required
                type="text"
                name="license_information"
                id="license_information"
                className="form-control"
              />
              <label htmlFor="license_information">License Information</label>
              </div>
              <div className="form-floating mb-3">
              <input
                defaultValue={therapist.state}
                placeholder="state"
                required
                type="text"
                name="state"
                id="state"
                className="form-control"
              />
              <label htmlFor="state">State</label>
              </div>
              <div className="form-floating mb-3">
              <input
                defaultValue={therapist.zipcode}
                placeholder="zipcode"
                required
                type="text"
                name="zipcode"
                id="zipcode"
                className="form-control"
              />
              <label htmlFor="zipcode">Zip code</label>
              </div>
            <div className="form-floating mb-3">
              <input
                defaultValue={therapist.about_me}
                placeholder="about_me"
                required
                type="text"
                name="about_me"
                id="about_me"
                className="form-control"
              />
              <label htmlFor="about_me">About Me</label>
              </div>
            <div className="form-floating mb-3">
              <input
                defaultValue={therapist.specialties}
                placeholder="specialties"
                required
                type="text"
                name="specialties"
                id="specialties"
                className="form-control"
              />
              <label htmlFor="specialties">Specialties</label>
            </div>
            <div className="form-floating mb-3">
              <input
                defaultValue={therapist.payment}
                placeholder="payment"
                required
                type="text"
                name="payment"
                id="payment"
                className="form-control"
              />
              <label htmlFor="payment">Payment</label>
            </div>
            <div className="form-floating mb-3">
              <input
                defaultValue={therapist.languages}
                placeholder="languages"
                required
                type="text"
                name="languages"
                id="languages"
                className="form-control"
              />
              <label htmlFor="languages">Languages</label>
            </div>
                <a href="#" className="btn btn-primary stretched-link">add to wish list!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
 )
}

export default TherapistProfile;