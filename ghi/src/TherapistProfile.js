import React, { useState } from 'react';

const TherapistProfile = () => {
  const [profileData, setProfileData] = useState({
    id: 0,
    name: "",
    license_information: "",
    state: "",
    zipcode: 0,
    picture: "",
    specialties: "",
    about_me: "",
    payment: "",
    languages: "",
    account_id: 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {}
        data.name
        data.license_information = city;
        data.state = state;
        data.zipcode = zipcode;
        data.additional_notes = additional_notes;
        data.account_id = account_id;
        data.wish_list = wish_list
        
        const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}therapy${id}`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={profileData.name} onChange={handleChange} />

      <label htmlFor="license_information">License Information:</label>
      <input type="text" name="license_information" value={profileData.license_information} onChange={handleChange} />

      <label htmlFor="state">State:</label>
      <input type="text" name="state" value={profileData.state} onChange={handleChange} />

      <label htmlFor="zipcode">Zipcode:</label>
      <input type="number" name="zipcode" value={profileData.zipcode} onChange={handleChange} />

      <label htmlFor="picture">Picture:</label>
      <input type="text" name="picture" value={profileData.picture} onChange={handleChange} />

      <label htmlFor="specialties">Specialties:</label>
      <input type="text" name="specialties" value={profileData.specialties} onChange={handleChange} />

      <label htmlFor="about_me">About Me:</label>
      <input type="text" name="about_me" value={profileData.about_me} onChange={handleChange} />

      <label htmlFor="payment">Payment:</label>
      <input type="text" name="payment" value={profileData.payment} onChange={handleChange} />

      <label htmlFor="languages">Languages:</label>
      <input type="text" name="languages" value={profileData.languages} onChange={handleChange} />

      <button type="submit">Save Profile</button>
    </form>
  );
};

export default TherapistProfile;