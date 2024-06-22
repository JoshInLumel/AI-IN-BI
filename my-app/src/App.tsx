import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BarChart from "./components/BarChart";
import ChartService from "./services/chartService";

function App() {
  return (
    <div className="app-wrapper">
      <BarChart chartData={ChartService.getDummyBarChartData()} />
    </div>
  );
}

export default App;
