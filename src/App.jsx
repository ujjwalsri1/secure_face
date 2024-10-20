import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import EmbedWebsite from "./EmbedWebsite"; // Import the EmbedWebsite component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/hello" element={<EmbedWebsite />} /> {/* Use EmbedWebsite component here */}
      </Routes>
    </Router>
  );
}

export default App;
