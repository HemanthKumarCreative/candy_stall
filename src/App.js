import React, { useState, useEffect } from "react";
import "./App.css";
import CandyForm from "./components/candyForm/candyForm";
import CandyTable from "./components/candyTable/candyTable";
import axios from "axios";

const URL = "http://localhost:3000/candies";

function App() {
  const [candyData, setCandyData] = useState([]);

  const fetchCandies = async () => {
    try {
      const response = await axios.get(URL);
      const data = response.data.filter((candy) => candy.quantity !== 0);
      setCandyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCandy = async (url, payload) => {
    try {
      const response = await axios.post(url, payload);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCandiesQuantity = async (url, lessBy, id) => {
    try {
      const response = await axios.put(`${url}/${id}/reduceQuantity/${lessBy}`);
      console.log(response);
      fetchCandies();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCandies = async () => {
      try {
        const response = await axios.get(URL);
        const data = response.data.filter((candy) => candy.quantity !== 0);
        setCandyData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCandies();
  }, []);

  const handleAddCandy = async (newCandy) => {
    const updatedCandyData = await addCandy(URL, newCandy);
    setCandyData([...candyData, updatedCandyData]);
  };

  return (
    <div className="App">
      <h1>Candy Shop</h1>
      <CandyForm onAddCandy={handleAddCandy} />
      {candyData.length ? (
        <CandyTable
          candyData={candyData}
          updateCandiesQuantity={updateCandiesQuantity}
          URL={URL}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
