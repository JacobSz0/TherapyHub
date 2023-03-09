import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Foot = () => {
  const [quote, setQuote] = useState(["Pending..."])
  useEffect (() => {
    async function getQuote() {
      try{
        const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}zenquotes`);
            if (response.ok) {
                var quoteData = await response.json();
                if (quoteData==='"Too many requests. Obtain an auth key for unlimited access." - zenquotes.io'){
                    quoteData="Just one small positive thought in the morning can change your whole day."
                }
                setQuote(quoteData)
            }
            else{setQuote("Just one small positive thought in the morning can change your whole day.")}
      } catch (error) {
        setQuote("Just one small positive thought in the morning can change your whole day.")
      }

    }
    getQuote()
  },[])
  return(
    <>
      <footer className="footer">
        <footer className="bg-info" style={{textAlign: "center", padding: "0px"}}>
            <div><span>{quote}</span></div>
            <div style={{padding: "7px"}}></div>
            <div>
                <span><strong>Team SWANK:</strong> Nancy Chavez, Will Howe, Ana María Pedroza,</span>
            </div>
            <div><span>Kamron Poosti, and Jacob Sullenszino - 2022-2023</span></div>
            <div><NavLink className="nav-link" to="/about-us">About Us</NavLink>|<NavLink className="nav-link" to="/contact-us">Contact</NavLink></div>
        </footer>
      </footer>
    </>
  )
}
export default Foot;
