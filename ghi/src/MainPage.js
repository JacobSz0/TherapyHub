import React, {useState, useEffect} from 'react';
import logo from "./imgs/logo.png";
//import $ from 'jquery';


function MainPage() {
  // const selectRef = useRef(null);

  // useEffect(() => {
  //   $(selectRef.current).multiselect();
  // }, []);

  return (



<div className="px-4 py-5 my-5 text-center">
  <img
    src={logo}
    className="img-fluid mx-auto d-block"
    alt="Responsive image"
    style={{ height: "600px" }}
  />
  <form className="form-inline mt-3">
    <input
      className="form-control mr-sm-2 search-input"
      type="search"
      placeholder="Zipcode"
      aria-label="Search"
    />
    <input
      className="form-control mr-sm-2 search-input"
      type="search"
      placeholder="Radius(Miles)"
      aria-label="Search"
    />
    <Link to="/therapists">
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
      Search
      </button>
    </Link>
  </form>
</div>


  );
}

export default MainPage;


//   <div className="px-4 py-5 my-5 text-center">
    //  <h1 className="display-5 fw-bold">TherapyHub</h1>
    //   <div className="col-lg-6 mx-auto">
    //     <p className="lead mb-4">
    //       Find your Therapist Today!
    //     </p>
    //   </div>
    // </div>
    //    <select id="example-multiple-selected" multiple ref={selectRef}>
    //   <option value="1">Option 1</option>
    //   <option value="2" selected>Option 2</option>
    //   <option value="3" selected>Option 3</option>
    //   <option value="4">Option 4</option>
    //   <option value="5">Option 5</option>
    //   <option value="6">Option 6</option>
    // </select>
