import React from "react"; 
import "./App.css"; 
import Header from "./Header"; 
import Footer from "./Footer"; 
import Trainer from "./Trainer"; 

function App() {
 return (
 <div className="App">
 <Header />

 <main className="app-main">
 <div className="app-main-inner">
 <Trainer />
 </div>
 </main>
 <Footer />
 </div>
 );
 }
 export default App;