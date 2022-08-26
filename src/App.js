import React from "react";
import "./App.css";
import Router from "./Router";
import LoadingOverlay from "@ronchalant/react-loading-overlay";
import { useSelector } from "react-redux";

function App() {
  const isActive = useSelector((state) => state.auth.isLoading);

  return (
    <React.Fragment>
      <LoadingOverlay
        className="custom-overlay"
        active={isActive}
        spinner
      ></LoadingOverlay>
      <Router></Router>
    </React.Fragment>
  );
}

export default App;
