import React, { useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import './styles.css';
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Added email state
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      // Initialize web3 and generate an Ethereum account
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const account = web3.eth.accounts.create();
      const address = account.address;

      // Send user data to the backend for admin confirmation
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, address }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Signup request sent! Please wait for confirmation.");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setMessage(data.message || "Signup failed. Please try again.");
      }

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
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
