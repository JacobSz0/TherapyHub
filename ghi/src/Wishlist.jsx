import React, { useEffect, useState } from "react";
import { useToken } from "./Authentication"


const cardStyle = {margin: '10px', padding: '10px'};
const deleteStyle = {color: "white", backgroundColor: "#BB4444"};

const Wishlist = () => {
  const [myWishlist, setWishlist] = useState([{"id":"2", "name": "Pending...", "state": "Pending..."}])
  const [currentClient, setClient] = useState([{"id":"2", "name": "Pending...", "state": "Pending..."}])
  const [account_id, setAccount_id] = useState("");
  const { token, login } = useToken();

  function parseJwt(data) {
  const base64Url = data.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const info = JSON.parse(window.atob(base64));
  setAccount_id(info.account.id)
  }

  async function getClients() {
    const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}client?account_id=${account_id}`);
    const response2 = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}therapy`);
    if (response.ok && response2.ok) {
      var clientData = await response.json();
      var therapyData = await response2.json();
      clientData=clientData[0]
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
    if (token) {
      parseJwt(token);
    }
    }, [token]);

  useEffect(() => {getClients()},[])

  const updateClient = async (therID) => {
    try {
      therID=JSON.stringify(therID)
      currentClient.wish_list.splice(currentClient.wish_list.indexOf(therID), 1);
      const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}client/${currentClient.id}`, {
        method: 'PUT',
        body: JSON.stringify(currentClient),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const clientData = await response.json();
      if (response.ok){getClients()}
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div>
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
                    <p className="card-text">
                      {i.specialties}
                    </p>
                    <p className="card-text">
                    { i.city }, { i.state } { i.zipcode }
                  </p>
                  </div>
                  <button type="button" onClick={() => updateClient(i.id)} style={deleteStyle}>DELETE</button>
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


// {therapists.filter(therapist => listZipcodes.includes(therapist.zipcode)).map((therapist) => (
//         <div key={i.id} className="col-sm-10">
//           <div className="card bg-light mb-3" style={cardStyle}>
//             <div className="row g-0">
//               <div className="col-md-4">
//                 <img src={i.picture} className="img-fluid rounded-start" alt="Therapist" />
//               </div>
//               <div className="col-md-8">
//                 <div className="card-body">
//                   <h5 className="card-title">{i.name}</h5>
//                   <h6 className="card-subtitle mb-2 text-muted">
//                     {i.license_information}
//                   </h6>
//                   <p className="card-text">
//                     {i.specialties}
//                   </p>
//                   <p className="card-text">
//                   { i.zipcode }
//                    , {' '}
//                   { i.state }
//                 </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
