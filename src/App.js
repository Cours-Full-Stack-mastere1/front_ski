import logo from "./logo.svg";
import "./App.css";
import { LoginForm } from "./components/molecules";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  const user = useSelector((state) => {
    return state.user;
  });
  return (
    <Router>
      <div className="App">
        <LoginForm />
      </div>
    </Router>
  );
}

export default App;
