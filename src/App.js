// src/App.js
import React from "react";
import "./App.css";

import Header from "./Header";
import Footer from "./Footer";
import Trainer from "./Trainer";

function App() {
  return (
    <div className="app-root">
      <Header />

      <main className="app-content">
        <Trainer />
      </main>

      <Footer />
    </div>
  );
}

export default App;
