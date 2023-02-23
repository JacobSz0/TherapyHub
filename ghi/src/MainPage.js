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

      <div style={{
      backgroundImage: `url(${logo})`,
      backgroundSize: 'cover',
      height: '600px',
      width: '100%'
    }}>

    </div>
    </div>
    //   <div className="px-4 py-5 my-5 text-center">
    //  <h1 className="display-5 fw-bold">TherapyHub</h1>
    //   <div className="col-lg-6 mx-auto">
    //     <p className="lead mb-4">
    //       Find your Therapist Today!
    //     </p>
    //   </div>
    //</div>
    //    <select id="example-multiple-selected" multiple ref={selectRef}>
    //   <option value="1">Option 1</option>
    //   <option value="2" selected>Option 2</option>
    //   <option value="3" selected>Option 3</option>
    //   <option value="4">Option 4</option>
    //   <option value="5">Option 5</option>
    //   <option value="6">Option 6</option>
    // </select>
  );
}

export default MainPage;