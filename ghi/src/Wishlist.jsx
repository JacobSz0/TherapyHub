import React, { useEffect, useState } from "react";


const Wishlist = () => {
  const [myWishlist, setWishlist] = useState([])
  useEffect(() => {
    async function getClients() {
        // Gets data from pharmacy and customers
        const clientURL = "http://localhost:8090/client"
        const therapistURL = "http://localhost:8090/therapy"
        const response = await fetch("http://localhost:8090/client");
        const response2 = await fetch("http://localhost:8090/therapy")
        if (response.ok && response2) {
          var clientData = await response.json();
          console.log(clientData)
          var therapyData = await response2.json();
        }
        var wishlist=clientData[1].wish_list
        var newWishlist=[]
        for (var i=0; i<wishlist.length; i++){
            wishlist[i]=parseInt(wishlist[i])
            for (var therapy=0; therapy<therapyData.length; therapy++){
                if (wishlist[i]===therapyData[therapy]["id"]){
                    newWishlist.push(therapyData[therapy])
                }
            }
        }
        console.log(newWishlist)
        setWishlist(newWishlist);
    }
    getClients()
},[])
  return(
    <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>State</th>
              <th>Specialties</th>
            </tr>
          </thead>
          <tbody>
            {myWishlist.map((i) => {
              return (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.state}</td>
                  <td>{i.specialties}</td>
                  <td>
                    <button type="button">DELETE</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  )

}
export default Wishlist;
