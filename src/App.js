import React, { useState } from "react";
import "./App.css";
import CandyForm from "./components/candyForm/candyForm";
import CandyTable from "./components/candyTable/candyTable";

function App() {
  const [candyData, setCandyData] = useState([]);

  const handleAddCandy = (newCandy) => {
    setCandyData([...candyData, newCandy]);
  };

  return (
    <div className="App">
      <h1>Candy Shop</h1>
      <CandyForm onAddCandy={handleAddCandy} />
      {candyData.length ? <CandyTable candyData={candyData} /> : ""}
    </div>
  );
}

export default App;
