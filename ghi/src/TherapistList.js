import React, { useState, useEffect } from 'react';

function TherapistList({ therapists, getTherapists }){
  if (therapists === undefined) {
     return null
  }
  console.log(therapists)
  return (
    <>
      <table className="table table-striped align-middle mt-5">
        <thead>
          <tr>
            <th>Therapists</th>
          </tr>
        </thead>
        <tbody>
          {therapists?.map((therapist) => {
            return (
              <tr key={therapist.id}>
                <td>{ therapist.name }</td>
                <td>{ therapist.specialties }</td>
                <td>{ therapist.zipcode }</td>
                <td>{ therapist.state }</td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </>
    );
}


export default TherapistList;