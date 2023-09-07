
import React, { useState } from "react";
import axios from "axios";

function NewPlantForm({ addPlant }) {
  const [plantData, setPlantData] = useState({
    name: "",
    image: "",
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantData({
      ...plantData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to add a new plant
    axios
      .post("http://localhost:6001/plants", plantData)
      .then((response) => {
        addPlant(response.data); // Update the plant list with the new plant
        setPlantData({
          name: "",
          image: "",
          price: 0,
        });
      })
      .catch((error) => console.error("Error adding a new plant:", error));
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={plantData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={plantData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={plantData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
