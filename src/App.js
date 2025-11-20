// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Trainer from "./Trainer";
import OodaIntro from "./OodaIntro";

function App() {
  return (
    <BrowserRouter basename="/1">
      <Routes>
        <Route path="/" element={<Trainer />} />
        <Route path="/ooda-intro" element={<OodaIntro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
