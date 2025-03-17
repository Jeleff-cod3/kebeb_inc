"use client";
import { useState, useEffect } from "react";

export default function Order() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ingredients-list")
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  const handleIngredientChange = (ingredient) => {
    const isSelected = selectedIngredients.some((i) => i.id === ingredient.id);
    let updatedIngredients = isSelected
      ? selectedIngredients.filter((i) => i.id !== ingredient.id)
      : [...selectedIngredients, ingredient];
    setSelectedIngredients(updatedIngredients);
    setTotalPrice(
      updatedIngredients.reduce((sum, i) => sum + parseFloat(i.price), 0)
    );
  };
}
