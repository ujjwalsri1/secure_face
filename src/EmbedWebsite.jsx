import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './new.css';
const EmbedWebsite = () => {
    const navigate = useNavigate(); // Hook to access the navigate instance
    const handleLogout = () => {
        // Add any logout logic here (e.g., clearing tokens)
        navigate('/signin'); // Redirect to the sign-in page
    };

    return (
        <div>
            <h1>Welcome to Face Attendance Website</h1>
            <iframe 
                src="https://ujjwalsri1.github.io/face_web/" 
                title="Embedded Website" 
                className="embedded-site" 
                style={{
                    width: '100%',
                    height: '600px',
                    border: 'none'
                }} 
		        allow="camera; microphone"
            />
            <button onClick={handleLogout} style={buttonStyle}>
                Logout
            </button>
        </div>
    );
};

// Simple button styling
const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
};

export default EmbedWebsite;
