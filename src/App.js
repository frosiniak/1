// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Trainer from "./Trainer";
import Footer from "./Footer";
import OodaIntro from "./OodaIntro";

function App() {
  return (
    <Router basename="/1">
      <div className="App">
        <header style={{ padding: "10px 0", backgroundColor: "#f5f5f5" }}>
          <h1 style={{ margin: 0, fontSize: "24px", color: "#333" }}>
            Донецький державний університет внутрішніх справ
          </h1>
        </header>

        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Trainer />} />
            <Route path="/ooda-intro" element={<OodaIntro />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
