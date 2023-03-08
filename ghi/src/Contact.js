import React from 'react';

function Contact() {
  return (
    <div className="d-flex">
      <div className="card mt-4 ml-4 shadow p-4 mt-4" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2 className="card-title">TherapyHub HQ</h2>
          <p className="card-text">Email: <a href="mailto:therapyhub@swank.com">therapyhub@swank.com</a></p>
          <p className="card-text">Phone: 310-553-8755</p>
          <p className="card-text">Address: 123 Wisteria Lane, Funkytown USA 51423</p>
          <div>
            <h2>Business Hours:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monday</td>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>Closed</td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
