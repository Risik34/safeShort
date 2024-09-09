import React from "react";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:token" element={<Redirect />} />
      </Routes>
    </Router>
  );
};

export default App;
