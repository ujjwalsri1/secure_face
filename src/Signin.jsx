import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();

    // Get the stored Ethereum address
    const storedAddress = localStorage.getItem("address");

    // Validate the entered address against the stored address
    if (address === storedAddress) {
      // If the address matches, navigate to the "Hello World" page
      navigate("/hello");
    } else {
      setMessage("Signin failed. Address not found.");
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={handleSignin}>
        <label>Ethereum Address: </label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <br />
        <button type="submit">Signin</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signin;
