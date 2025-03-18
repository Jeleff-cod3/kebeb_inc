"use client";
import { useState, useEffect } from "react";

export default function Order() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/kebab-add");
        const data = await response.json();
        setIngredients(data.ingredients);
      } catch (error) {
        console.log("Error nigga");
      }
    }

    fetchData();
  }, []);

  const handleIngridientSelection = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((ing) => ing !== ingredient);
      } else {
        return [...prevSelected, ingredient];
      }
    });
    setTotalPrice((prevPrice) =>
      selectedIngredients.includes(ingredient)
        ? prevPrice - ingredient.prevPrice
        : prevPrice + ingredient.price
    );
  };
}
