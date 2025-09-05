// src/App.js
import React from "react";
import "./App.css";
import Trainer from "./Trainer";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <header style={{ padding: "10px 0", backgroundColor: "#f5f5f5" }}>
        <h1 style={{ margin: 0, fontSize: "24px", color: "#333" }}>
          Донецький державний університет внутрішніх справ
        </h1>
      </header>

      <main style={{ padding: "20px" }}>
        <Trainer />
      </main>

      <Footer />
    </div>
  );
}

export default App;
