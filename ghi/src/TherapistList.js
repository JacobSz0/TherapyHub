import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
//Hello
import { Multiselect } from "multiselect-react-dropdown";



function TherapistList({ therapists, getTherapists }){

  // const cardStyle = {
  //   margin: '10px',
  //   padding: '10px',
  // };

  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [listZipcodes, setListZipcodes] = useState([]);
  const [zip_code, setZipCode] = useState(searchParams.get('zip_code'));
  const [radius, setRadius] = useState(searchParams.get('radius'));
  console.log(selectedSpecialties)
  console.log(selectedPayments)

  useEffect(() => {
    const handleSearch = async () => {
      const data = {
        zip_code,
        radius,
      };

      const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}zipcode?zip_code=${zip_code}&radius=${radius}`;
      const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const listZipcodes = await response.json();
        setListZipcodes(listZipcodes);
        console.log(listZipcodes);
      }
    };
    handleSearch();
  }, [zip_code, radius]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ zip_code, radius });
  };

  const handleZipcodeChange = (event) => {
    const value = event.target.value
    setZipCode(value);
  };

  const handleRadiusChange = (event) => {
    const value = event.target.value;
    setRadius(value);
  };

  if (therapists === undefined) {
    return null;
  }


  return (
    <div className="row justify-content-center">
      <form onSubmit={handleSearch} className="form-inline mt-3">
        <input
          onChange={handleZipcodeChange}
          className="form-control mr-sm-2 search-input"
          type="search"
          placeholder="Zipcode"
          aria-label="Search"
          value={zip_code}
        />
        <label>Zipcode</label>

        <input
          onChange={handleRadiusChange}
          className="form-control mr-sm-2 search-input"
          type="search"
          placeholder="Miles"
          aria-label="Search"
          value={radius}
        />
        <label>Radius(Miles)</label>

<Multiselect
  style={{searchBox: {width: "500px"}}}
  placeholder="Filter"
  displayValue="key"
  groupBy="cat"
  onRemove={(selectedList, removedItem) => {
    if (removedItem.cat === "Specialty") {
      setSelectedSpecialties(selectedSpecialties.filter(item => item !== removedItem.key));
    } else if (removedItem.cat === "Payment") {
      setSelectedPayments(selectedPayments.filter(item => item !== removedItem.key));
    }
  }}
  onSelect={(selectedList, selectedItem) => {
    if (selectedItem.cat === "Specialty") {
      setSelectedSpecialties([...selectedSpecialties, selectedItem.key]);
    } else if (selectedItem.cat === "Payment") {
      setSelectedPayments([...selectedPayments, selectedItem.key]);
    }
  }}
  options={[
    {
      cat: 'Specialty',
      key: 'Anxiety'
    },
    {
      cat: 'Specialty',
      key: 'Depression'
    },
    {
      cat: 'Specialty',
      key: 'Individual'
    },
    {
      cat: 'Specialty',
      key: 'Couples'
    },
    {
      cat: 'Specialty',
      key: 'Child & Adolescents'
    },
    {
      cat: 'Specialty',
      key: 'Trauma'
    },
    {
      cat: 'Payment',
      key: 'Cash'
    },
        {
      cat: 'Payment',
      key: 'Anthem'
    },
        {
      cat: 'Payment',
      key: 'Kaiser Permamente'
    },
        {
      cat: 'Payment',
      key: 'Healthnet'
    },
        {
      cat: 'Payment',
      key: 'State Farm'
    },
        {
      cat: 'Payment',
      key: 'Progressive'
    }
  ]}
  showCheckbox
/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      {therapists.filter(therapist =>
   listZipcodes.includes(therapist.zipcode) &&
   (selectedSpecialties.length === 0 || therapist.specialties.split(",").some(specialty => selectedSpecialties.includes(specialty))) &&
   (selectedPayments.length === 0 || therapist.payment.split(",").some(payment => selectedPayments.includes(payment)))
).map((therapist) => (
        <div key={therapist.id} className="col-sm-10">
          <div className="card bg-light mb-3">
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
                <a href="#" className="btn btn-primary stretched-link">Learn more!</a>
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