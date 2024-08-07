import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LeadTable from "./components/LeadTable.jsx";
import LeadForm from "./components/LeadForm.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}>
          <Route path=""  element={<LeadTable/>} />
          <Route path="/add" element={<LeadForm/>} />
          <Route path="edit/:id" element={<LeadForm/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
