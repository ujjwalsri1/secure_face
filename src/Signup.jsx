import React, { useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      // Initialize web3 and generate an Ethereum account
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const account = web3.eth.accounts.create();
      const address = account.address;

      // Store the user details in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("address", address);

      setMessage(`Signup successful! Your Ethereum address: ${address}`);
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      console.error(error);
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Username: </label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br />
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
