import React ,{useState,useEffect} from "react";

function ClientSignupForm(){

    // const[name, setName] = useState("");
    // const[city, setCity] = useState("");
    // const[state, setState] = useState("");
    // const[zipcode, setZipcode] = useState("");
    // const[additionalNotes, setAdditionalNote] = useState("");
    const[roles, setRoles] = useState([]);
    
    

    const fetchData = async () => {
      const url = `${process.env.REACT_APP_THERAPYHUB_API_HOST}role`
      const response = await fetch (url)
        if (response.ok){
            const data = await response.json();
            console.log(data)
            setRoles(data)
              
        }
    }

    useEffect (() => {
        fetchData();
    }, [])
    return (
     
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add information</h1>
              <form id="create-new-client-form">
                <select required name="role" id="role" className="form-select" >
                  <option value="">Therapist or Client</option>
                  {roles.map((role, index) => (
                  <option key={index} value={role.id}>
                    {role.role}
                  </option>
                ))}
                </select>

                <button className="btn btn-success btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
 )
    

}

export default ClientSignupForm