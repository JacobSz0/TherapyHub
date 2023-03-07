import React, { useEffect, useState } from "react";

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
        <footer className="bg-info" style={{textAlign: "center", padding: "20px"}}>
            <div><span>{quote}</span></div>
            <div style={{padding: "7px"}}></div>
            <div>
                <span>Authors: Team SWANK: Nancy Chavez, Will Howe, Ana María Pedroza,</span>
            </div>
            <div><span>Kamron Poosti, and Jacob Sullenszino - 2022-2023</span></div>
            <div><a href="/about-us">About Us</a> | <a href="/contact-us">Contact</a></div>
        </footer>
    </>
  )
}
export default Foot;
