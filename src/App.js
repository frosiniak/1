// src/App.js
import React from "react";
import Trainer from "./Trainer";

import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />

      <div style={{ minHeight: "calc(100vh - 160px)" }}>
        <Trainer />
      </div>

      <Footer />
    </>
  );
}

export default App;

