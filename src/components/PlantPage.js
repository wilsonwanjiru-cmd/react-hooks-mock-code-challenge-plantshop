import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [plants, setPlants] = useState([]);

  // Fetch plant data from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        setFilteredPlants(data);
      })
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  // Function to handle search
  const handleSearch = (searchTerm) => {
    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  // Function to add a new plant to the list
  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
    setFilteredPlants([...filteredPlants, newPlant]);
  };

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search handleSearch={handleSearch} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;


