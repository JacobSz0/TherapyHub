import React, { useState, useEffect } from 'react';
import { useToken } from "./Authentication";
import { useParams } from "react-router-dom";

function TherapistProfile(){
  const [therapist, setTherapistDetail] = useState({});
  const [currentClient, setClient] = useState([]);
  const [addButton, setAdd] = useState(false)
  const [deleteButton, setDelete] = useState(false)
  const {id} = useParams();
  const { token, login } = useToken();

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    return info.account.id
  }

  const fetchTherapist = async () => {
    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}therapy/${id}`
    const response = await fetch (url)
        if (response.ok){
            const data = await response.json();
            console.log("data******",data)
            setTherapistDetail(data)
            return(data.id)
  }
  }

  async function getClient(account_id, therID) {
    const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}client?account_id=${account_id}`);
    if (response.ok){
      var clientData = await response.json()
      if (clientData[0]?.wish_list.includes(JSON.stringify(therID))){
        setAdd(false)
        setDelete(true)
      }
      else if (clientData[0]?.wish_list){
        setAdd(true)
        setDelete(false)
      }
      setClient(clientData)
    }
  }


  async function updateAddClient() {
    var therID=JSON.stringify(therapist.id)
    var clientDataL=currentClient[0]
    clientDataL.wish_list.push(therID)
      try {
        const responseBack = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}client/${clientDataL.id}`, {
          method: 'PUT',
          body: JSON.stringify(clientDataL),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const clientDataF = await responseBack.json();
        setAdd(false)
        setDelete(true)
      } catch (error) {
        console.error(error);
      }
  }

  const updateDeleteClient = async () => {
    try {
      var therID=JSON.stringify(therapist.id)
      var clientDataL=currentClient[0]
      clientDataL.wish_list.splice(clientDataL.wish_list.indexOf(therID), 1);
      const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}client/${clientDataL.id}`, {
        method: 'PUT',
        body: JSON.stringify(clientDataL),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const clientData = await response.json();
      if (response.ok){getClient()}
    } catch (error) {
      console.error(error);
    }
  };

  useEffect (() => {
    async function getData(){
      if (token) {
        const account_id = parseJwt(token);
        const therID = await fetchTherapist();
        getClient(account_id, therID)
      }
    }
    getData()
  }, [token]);


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
              {addButton ?
                <button type="button" onClick={() => updateAddClient()}>Add to Wishlist</button>
              : null}
              {deleteButton ?
                <button type="button" onClick={() => updateDeleteClient()}>DELETE</button>
              : null}
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