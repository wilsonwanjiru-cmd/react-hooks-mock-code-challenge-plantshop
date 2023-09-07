import React, { useState } from "react";
import axios from "axios";

function PlantCard({ plant }) {
  const [isSoldOut, setIsSoldOut] = useState(plant.isSoldOut);

  // Function to mark a plant as "sold out"
  const markAsSoldOut = () => {
    axios
      .patch(`http://localhost:6001/plants/${plant.id}`, {
        isSoldOut: true,
      })
      .then(() => setIsSoldOut(true))
      .catch((error) => console.error("Error marking plant as sold out:", error));
  };

  // Ensure that price is a valid number before calling toFixed
  const formattedPrice = typeof plant.price === "number" ? plant.price.toFixed(2) : "N/A";

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${formattedPrice}</p>
      {isSoldOut ? (
        <button className="primary">In Stock</button>
      ) : (
        <button onClick={markAsSoldOut}>Mark as Sold Out</button>
      )}
    </li>
  );
}

export default PlantCard;



