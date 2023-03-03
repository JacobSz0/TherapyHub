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
      const therID = await fetchTherapist();
      if (token) {
        const account_id = parseJwt(token);
        getClient(account_id, therID)
      }
    }
    getData()
  }, [token]);


 return (
   <div className="row">
     <p>
       {" "}
       <br></br>{" "}
     </p>
     <div className="main-body">
       <div className="row">
         <div className="col-lg-4">
           <div className="card">
             <div className="card-body">
               <div className="d-flex flex-column align-items-center text-center">
                 <img
                   src={therapist.picture}
                   alt="Admin"
                   className="rounded-circle p-1 bg-primary"
                   width="110"
                 />
                 <div className="mt-3">
                   <p className="text-secondary mb-1">{therapist.name}</p>
                   <p className="text-muted font-size-sm">
                     {therapist.city}, {therapist.state}, {therapist.zipcode}
                   </p>
                   {addButton ? (
                     <button
                       className="btn btn-outline-info my-2 my-sm-0"
                       type="button"
                       onClick={() => updateAddClient()}
                     >
                       Add to Wishlist
                     </button>
                   ) : null}
                   {deleteButton ? (
                     <button
                       className="btn btn-outline-info my-2 my-sm-0"
                       type="button"
                       onClick={() => updateDeleteClient()}
                     >
                       DELETE
                     </button>
                   ) : null}
                 </div>
               </div>
             </div>
           </div>
         </div>
         <p>
           {" "}
           <br></br>{" "}
         </p>
         <div className="col-lg-8">
           <div className="card">
             <div className="card-body">
               <div className="row mb-3">
                 <div className="col-sm-3">
                   <h6 className="mb-0">Full Name</h6>
                 </div>
                 <div className="col-sm-9 text-secondary">
                   <h6 className="mb-0">{therapist.name}</h6>
                 </div>
               </div>
               <div className="row mb-3">
                 <div className="col-sm-3">
                   <h6 className="mb-0">Phone</h6>
                 </div>
                 <div className="col-sm-9 text-secondary">
                   <h6 className="mb-0">{therapist.phone}</h6>
                 </div>
               </div>
               <div className="row mb-3">
                 <div className="col-sm-3">
                   <h6 className="mb-0">Email</h6>
                 </div>
                 <div className="col-sm-9 text-secondary">
                   <h6 className="mb-0">{therapist.email}</h6>
                 </div>
               </div>
               <div className="row mb-3">
                 <div className="col-sm-3">
                   <h6 className="mb-0">License Information</h6>
                 </div>
                 <div className="col-sm-9 text-secondary">
                   <h6 className="mb-0">{therapist.license_information}</h6>
                 </div>
               </div>
               <div className="row mb-3">
                 <div className="col-sm-3">
                   <h6 className="mb-0">Specialties</h6>
                 </div>
                 <div className="col-sm-9 text-secondary">
                   {therapist.specialties && (
                     <h6 className="mb-0">
                       {therapist.specialties.join(", ")}
                     </h6>
                   )}
                 </div>
               </div>
               <div className="row mb-3">
                 <div className="col-sm-3">
                   <h6 className="mb-0">Payment</h6>
                 </div>
                 <div className="col-sm-9 text-secondary">
                   {therapist.payment && (
                     <h6 className="mb-0">{therapist.payment.join(", ")}</h6>
                   )}
                 </div>
               </div>
               <div className="row mb-3">
                 <div className="col-sm-3">
                   <h6 className="mb-0">Languages</h6>
                 </div>
                 <div className="col-sm-9 text-secondary">
                   <h6 className="mb-0">{therapist.languages}</h6>
                 </div>
               </div>
               <div className="row">
                 <div className="col-sm-3"></div>
               </div>
             </div>
           </div>
           <p>
             {" "}
             <br></br>{" "}
           </p>
           <div className="row">
             <div className="col-sm-12">
               <div className="card">
                 <div className="card-body">
                   <h5 className="d-flex align-items-center mb-3">About Me</h5>
                   <div className="col-sm-9 text-secondary">
                     <p className="text-secondary mb-1">{therapist.about_me}</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}

export default TherapistProfile;
