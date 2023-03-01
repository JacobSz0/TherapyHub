import React, { useEffect, useState } from "react";
import { useToken } from "./Authentication";

function ClientUpdateForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [additional_notes, setAdditional_notes] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [wish_list, setWish_list] = useState([]);
  const [client_id, setClient_id] = useState("");
  const { token, login } = useToken();

  async function get_by_account_id(acc_id) {
    const response = await fetch(
      `${process.env.REACT_APP_THERAPYHUB_API_HOST}clientacc?account_id=${acc_id}`
    );
    var clientdata = await response.json();
    console.log(clientdata)
    setName(clientdata.name);
    setCity(clientdata.city);
    setState(clientdata.state);
    setAdditional_notes(clientdata.additional_notes);
    setWish_list(clientdata.wish_list);
    setClient_id(clientdata.id);
  }

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    // console.log(info);
    return info.account.id;
  }

  useEffect(() => {
    async function getData() {
      if (token) {
        const acc_id = parseJwt(token);
        get_by_account_id(acc_id);
      }
    }
    getData();
  }, [token]);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
  };

  const handleStateChange = (event) => {
    const value = event.target.value;
    setState(value);
  };

  const handleZipCodeChange = (event) => {
    const value = event.target.value;
    setZipcode(value);
  };

  const handleAdditionalNotesChange = (event) => {
    const value = event.target.value;
    setAdditional_notes(value);
  };

  // const handleWishListChange = (event) => {
  //   event.preventDefault();
  //   setWish_list([...wish_list, ""]);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    // data.id=client_id;
    data.name = name;
    data.city = city;
    data.state = state;
    data.zipcode = zipcode;
    data.additional_notes = additional_notes;
    data.account_id = account_id;
    data.wish_list = wish_list;

    //   async function YaMom(){
    //   const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}client?account_id=${account_id}`);
    //   var testData = await response.json();
    //   if (response.ok){console.log(testData)}
    // }

    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}client/client_id=${client_id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newClient = await response.json();
      console.log(newClient);

      setName("");
      setCity("");
      setState("");
      setZipcode("");
      setAdditional_notes("");
      // setClient_id("");
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add information</h1>
            <form onSubmit={handleSubmit} id="create-new-employee-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleNameChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={name}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleCityChange}
                  placeholder="city"
                  required
                  type="text"
                  name="city"
                  id="city"
                  className="form-control"
                  value={city}
                />
                <label htmlFor="city">City</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleStateChange}
                  placeholder="state"
                  required
                  type="text"
                  name="state"
                  id="state"
                  className="form-control"
                  value={state}
                />
                <label htmlFor="state">State</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleZipCodeChange}
                  placeholder="zipcode"
                  required
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  className="form-control"
                  value={zipcode}
                />
                <label htmlFor="zipcode">ZIP code</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleAdditionalNotesChange}
                  placeholder="additional_notes"
                  required
                  type="text"
                  name="additional_notes"
                  id="additional_notes"
                  className="form-control"
                  value={additional_notes}
                />
                <label htmlFor="additional_notes">Notes</label>
              </div>
              <button className="btn btn-success btn-primary">UPDATE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientUpdateForm;
