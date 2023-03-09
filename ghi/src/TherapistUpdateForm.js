import React, { useRef, useEffect, useState } from "react";
import { useToken } from "./Authentication";
import { useNavigate } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";


function TherapistUpdateForm() {
  const [name, setName] = useState("");
  const [license_information, setLicense_information] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [picture, setPicture] = useState("");
  const [about_me, setAbout_me] = useState("");
  const [languages, setLanguages] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [city, setCity] = useState("");
  const { token } = useToken();
  const [therapist_id, setTherapist_id] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);

  const specialtiesRef = useRef();
  const paymentRef = useRef();

  const resetValues = () => {
    specialtiesRef.current.resetSelectedValues();
    paymentRef.current.resetSelectedValues();
  };

  const navigate = useNavigate();

  async function get_by_account_id(acc_id) {
    const response = await fetch(
      `${process.env.REACT_APP_THERAPYHUB_API_HOST}therapistacc?account_id=${acc_id}`
    );
    var therapistdata = await response.json();
    setName(therapistdata.name);
    setLicense_information(therapistdata.license_information);
    setState(therapistdata.state);
    setZipcode(therapistdata.zipcode);
    setPicture(therapistdata.picture);
    setAbout_me(therapistdata.about_me);
    setLanguages(therapistdata.languages);
    setPhone(therapistdata.phone);
    setEmail(therapistdata.email);
    setCity(therapistdata.city);
    setSelectedSpecialties(therapistdata.specialties);
    setSelectedPayments(therapistdata.payment);
    setTherapist_id(therapistdata.id);
    setAccount_id(therapistdata.account_id);
  }

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
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

  const handleLicense_informationChange = (event) => {
    const value = event.target.value;
    setLicense_information(value);
  };

  const handleStateChange = (event) => {
    const value = event.target.value;
    setState(value);
  };

  const handleZipcodeChange = (event) => {
    const value = event.target.value;
    setZipcode(value);
  };

  const handlePictureChange = (event) => {
    const value = event.target.value;
    setPicture(value);
  };

  const handleSpecialtiesChange = (selectedList, selectedItem) => {
    setSelectedSpecialties(selectedList.map((item) => item.value));
  };

  const handleAbout_meChange = (event) => {
    const value = event.target.value;
    setAbout_me(value);
  };

  const handlePaymentChange = (selectedList, selectedItem) => {
    setSelectedPayments(selectedList.map((item) => item.value));
  };

  const handleLanguagesChange = (event) => {
    const value = event.target.value;
    setLanguages(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhone(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.license_information = license_information;
    data.city = city;
    data.state = state;
    data.zipcode = zipcode;
    data.picture = picture;
    data.specialties = selectedSpecialties;
    data.about_me = about_me;
    data.payment = selectedPayments;
    data.languages = languages;
    data.email = email;
    data.phone = phone;
    data.account_id = account_id;

    const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}therapy/${therapist_id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();

      setName("");
      setLicense_information("");
      setCity("");
      setState("");
      setZipcode("");
      setPicture("");
      setSelectedSpecialties([]);
      setAbout_me("");
      setSelectedPayments([]);
      setLanguages("");
      setEmail("");
      setPhone("");
      resetValues();

      navigate("/");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit} id="create-therapist-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                value={name}
                placeholder="name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleLicense_informationChange}
                value={license_information}
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
                onChange={handleCityChange}
                value={city}
                placeholder="city"
                required
                type="text"
                name="city"
                id="city"
                className="form-control"
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleStateChange}
                value={state}
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
                onChange={handleZipcodeChange}
                value={zipcode}
                placeholder="zipcode"
                required
                type="text"
                name="zipcode"
                id="zipcode"
                className="form-control"
              />
              <label htmlFor="zipcode">Zipcode</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleEmailChange}
                value={email}
                placeholder="email"
                required
                type="text"
                name="email"
                id="email"
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handlePhoneChange}
                value={phone}
                placeholder="phone"
                required
                type="text"
                name="phone"
                id="phone"
                className="form-control"
              />
              <label htmlFor="phone">Phone</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handlePictureChange}
                value={picture}
                placeholder="picture"
                required
                type="text"
                name="picture"
                id="picture"
                className="form-control"
              />
              <label htmlFor="picture">Picture</label>
            </div>

            <div className="form-floating mb-3">
              <Multiselect
                onChange={handleSpecialtiesChange}
                required
                value={selectedSpecialties}
                placeholder="Specialties"
                name="specialties"
                id="specialties"
                className="form-select"
                displayValue="key"
                ref={specialtiesRef}
                onRemove={(selectedList, removedItem) => {
                  setSelectedSpecialties(
                    selectedSpecialties.filter(
                      (item) => item !== removedItem.key
                    )
                  );
                }}
                onSelect={(selectedList, selectedItem) => {
                  setSelectedSpecialties([
                    ...selectedSpecialties,
                    selectedItem.key,
                  ]);
                }}
                options={[
                  {
                    cat: "Specialty",
                    key: "Anxiety",
                  },
                  {
                    cat: "Specialty",
                    key: "Depression",
                  },
                  {
                    cat: "Specialty",
                    key: "Individual",
                  },
                  {
                    cat: "Specialty",
                    key: "Couples",
                  },
                  {
                    cat: "Specialty",
                    key: "Child & Adolescents",
                  },
                  {
                    cat: "Specialty",
                    key: "Trauma",
                  },
                ]}
                showCheckbox
              />
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleAbout_meChange}
                value={about_me}
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
              <Multiselect
                onChange={handlePaymentChange}
                value={selectedPayments}
                required
                name="payment"
                id="payment"
                className="form-select"
                placeholder="Payment"
                displayValue="key"
                ref={paymentRef}
                onRemove={(selectedList, removedItem) => {
                  setSelectedPayments(
                    selectedPayments.filter((item) => item !== removedItem.key)
                  );
                }}
                onSelect={(selectedList, selectedItem) => {
                  setSelectedPayments([...selectedPayments, selectedItem.key]);
                }}
                options={[
                  {
                    cat: "Payment",
                    key: "Cash",
                  },
                  {
                    cat: "Payment",
                    key: "Anthem",
                  },
                  {
                    cat: "Payment",
                    key: "Kaiser Permamente",
                  },
                  {
                    cat: "Payment",
                    key: "Healthnet",
                  },
                  {
                    cat: "Payment",
                    key: "State Farm",
                  },
                  {
                    cat: "Payment",
                    key: "Progressive",
                  },
                ]}
                showCheckbox
              />
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleLanguagesChange}
                value={languages}
                placeholder="languages"
                required
                type="text"
                name="languages"
                id="languages"
                className="form-control"
              />
              <label htmlFor="languages">Languages</label>
            </div>
            <button className="btn btn-outline-info my-2 my-sm-0">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TherapistUpdateForm;
