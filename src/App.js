import logo from "./logo.svg";
import "./App.css";
import { LoginForm } from "./components/molecules";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Header from "./components/organisms/Header/Header";
import AllStations from "./components/pages/Station/AllStations";

function App() {
  const user = useSelector((state) => {
    return state.user;
  });
  return (
    <Router>
      <Header />
      <div className="App">
        {user?.username ? <AllStations /> : <LoginForm />}
      </div>
    </Router>
  );
}

export default App;
