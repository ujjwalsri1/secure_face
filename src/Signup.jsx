import React, { useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import './styles.css';
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

    // Inline styles
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8', // Light background
        color: '#333', // Darker text for better readability
    };

    const formStyle = {
        backgroundColor: '#fff', // White background for the form
        border: '1px solid #ccc', // Light gray border
        borderRadius: '10px', // Rounded corners
        padding: '20px', // Padding around form elements
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        maxWidth: '400px', // Maximum width of the form
        width: '90%', // Responsive width
    };

    const inputStyle = {
        marginBottom: '15px', // Space between inputs
        padding: '10px', // Inner padding
        border: '1px solid #007bff', // Blue border
        borderRadius: '5px', // Rounded corners
        width: '100%', // Full width for inputs
        fontSize: '16px', // Font size
        boxSizing: 'border-box', // Include padding in width
    };

    const buttonStyle = {
        backgroundColor: '#007bff', // Blue background for button
        color: 'white', // White text
        padding: '10px', // Padding
        border: 'none', // No border
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
        fontSize: '16px', // Font size
        transition: 'background-color 0.3s', // Smooth transition
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3', // Darker blue on hover
    };

    return (
        <div style={containerStyle}>
            <h2>Signup</h2>
            <form onSubmit={handleSignup} style={formStyle}>
                <label style={{ fontWeight: 'bold' }}>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={inputStyle}
                />
                <label style={{ fontWeight: 'bold' }}>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Signup
                </button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Signup;
