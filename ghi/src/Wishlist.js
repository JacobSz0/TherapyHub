import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "./Authentication"
import logo from "./imgs/doughnut.png"


const cardStyle = {margin: '10px', padding: '10px'};
const deleteStyle = {color: "white", backgroundColor: "#BB4444"};

const Wishlist = () => {
  const [myWishlist, setWishlist] = useState([{"id":"2", "name": "Pending...", "state": "Pending..."}])
  const [currentClient, setClient] = useState([{"id":"2", "name": "Pending...", "state": "Pending..."}])
  const [account_id, setAccount_id] = useState("");
  const { token } = useToken();

  function parseJwt(data) {
  const base64Url = data.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const info = JSON.parse(window.atob(base64));
  setAccount_id(info.account.id)
  return info.account.id
  }

  async function getClients(account_id) {
    const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}clientacc?account_id=${account_id}`);
    const response2 = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}therapy`);
    if (response.ok && response2.ok) {
      var clientData = await response.json();
      var therapyData = await response2.json();
      var newWishlist=[]
      var wishListInt=[]
      for (var i=0; i<clientData.wish_list.length; i++){
          wishListInt[i]=parseInt(clientData.wish_list[i])
          for (var therapy=0; therapy<therapyData.length; therapy++){
              if (wishListInt[i]===therapyData[therapy]["id"]){
                  newWishlist.push(therapyData[therapy])
              }
          }
      }
    }
    setClient(clientData)
    setWishlist(newWishlist);
  }
  useEffect (() => {

    async function getData(){
      if (token) {
        const account_id = parseJwt(token);
        getClients(account_id)
      }
    }
    getData()
  },[token, account_id])

  const updateClient = async (therID,clID) => {
    try {
      therID=JSON.stringify(therID)
      currentClient.wish_list.splice(currentClient.wish_list.indexOf(therID), 1);
      const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}client/${clID}`, {
        method: 'PUT',
        body: JSON.stringify(currentClient),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      if (response.ok){getClients(account_id)}
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div>
      {!myWishlist[0] ? (
        <div style={{textAlign: "center"}}>
          <br></br>
          <br></br>
          <br></br>
          <h4>You don't have any theripists in your wishlist.</h4>
          <br></br>
                <img
        src={logo}
        className="mx-auto d-block"
        alt=""
        style={{ objectFit: "contain", width: "50%", height: "50%" }}
      />
          <br></br>
          <h4>Why don't you go find some and add them to your wishlist!</h4>
          <br></br>
          <br></br>
          <br></br>
        </div>
      ) : null}
        {myWishlist.map((i) => {
          return (
            <div key={i.id} className="col-sm-10">
              <div className="card bg-light mb-3" style={cardStyle}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={i.picture} className="img-fluid rounded-start" alt="Therapist" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{i.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {i.license_information}
                      </h6>
                      {i.specialties && (
                    <p className="card-text">{i.specialties.join(', ')}</p>
                      )}
                      {i.payment && (
                    <p className="card-text">{i.payment.join(', ')}</p>
                      )}
                      <p className="card-text">
                      { i.city }, { i.state } { i.zipcode }
                    </p>
                    </div>
                      <NavLink to={`/therapist/detail/${i.id}`} className="btn btn-primary">Learn more!</NavLink>
                    <p></p>
                    <button className="btn btn-primary" type="button" onClick={() => updateClient(i.id, currentClient.id)} style={deleteStyle}>DELETE</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  )

}
export default Wishlist;
