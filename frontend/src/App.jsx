import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import LeadForm from "./components/LeadForm";
import LeadTable from "./components/LeadTable";
import Navbar from "./components/Navbar";

const App = () => (

    <div className="App">
      <Navbar/>
      <h1 style={{fontFamily: "New Amsterdam, sans-serif"}}>Lead Management System</h1>
      <Outlet/>

    </div>
);

export default App;
