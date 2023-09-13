import React, { useState, useEffect } from "react";
import "./App.css";
import CandyForm from "./components/candyForm/candyForm";
import CandyTable from "./components/candyTable/candyTable";
import axios from "axios";

const URL = "https://crudcrud.com/api/57685d4120ab4b1a87417be1d1d1dd85/candies";

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
    const initial_candy_response = await axios.get(`${url}/${id}`);
    const initial_candy = initial_candy_response.data;
    console.log({ initial_candy });
    initial_candy.quantity = parseInt(initial_candy.quantity) - lessBy;
    console.log(initial_candy);
    const response = await axios.put(`${url}/${id}`, initial_candy);
    console.log({ response });
    const final_candy = await axios.get(`${url}/${id}`);
    console.log({ final_candy });
  } catch (error) {
    console.error(error);
  }
};

function App() {
  const [candyData, setCandyData] = useState([]);

  useEffect(() => {
    const fetchCandies = async () => {
      try {
        const response = await axios.get(URL);
        const data = response.data;
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
