import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <div>  

      <div id="background-image"></div>   
      <video id="video-background" autoPlay loop muted>
    <source src="../public/650205.jpg" type="video/mp4" id="video-background"/>
  </video>
    
      <BrowserRouter>

        <AppRoutes></AppRoutes>
      </BrowserRouter>
    </div>
  );
}

export default App;
