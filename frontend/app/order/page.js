"use client";
import { useState, useEffect } from "react";

export default function Order() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(4);
  const [kebabType, setKebabType] = useState("B");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/ingredients-list"
        );
        const data = await response.json();
        const ingredientsWithNumberPrices = data.map((ingredient) => ({
          ...ingredient,
          price: Number(ingredient.price),
        }));
        setIngredients(ingredientsWithNumberPrices);
      } catch (error) {
        console.log("Error fetching ingredients", error);
      }
    }
    fetchData();
  }, []);

  const handleIngredientSelection = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      const isSelected = prevSelected.includes(ingredient);
      let newSelectedIngredients;

      if (isSelected) {
        newSelectedIngredients = prevSelected.filter(
          (ing) => ing !== ingredient
        );
        setTotalPrice((prevPrice) => prevPrice - ingredient.price);
      } else {
        newSelectedIngredients = [...prevSelected, ingredient];
        setTotalPrice((prevPrice) => prevPrice + ingredient.price);
      }

      return newSelectedIngredients;
    });
  };

  const displaySelectedIngredients = () => {
    return selectedIngredients.map((ingredient) => (
      <li key={ingredient.id}>
        {ingredient.name} - ${ingredient.price}
      </li>
    ));
  };

  const handleKebabTypeChange = (type) => {
    setKebabType((prevType) => {
      let newPrice = totalPrice;

      if (prevType === "B") {
        newPrice -= 4;
      } else if (prevType === "C") {
        newPrice -= 4;
      }

      if (type === "B") {
        newPrice += 4;
      } else if (type === "C") {
        newPrice += 4;
      }

      setTotalPrice(newPrice);
      return type;
    });
  };

  return (
    <div>
      <h1>Build Your Kebab</h1>
      <div>
        <label>
          <input
            type="radio"
            name="kebabType"
            value="B"
            checked={kebabType === "B"}
            onChange={() => handleKebabTypeChange("B")}
          />
          Beef
        </label>
        <label>
          <input
            type="radio"
            name="kebabType"
            value="C"
            checked={kebabType === "C"}
            onChange={() => handleKebabTypeChange("C")}
          />
          Chicken
        </label>
      </div>
      <h3>Select Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => handleIngredientSelection(ingredient)}
            />
            {ingredient.name} - ${ingredient.price}
          </li>
        ))}
      </ul>
      <h3>Selected Ingredients:</h3>
      <ul>{displaySelectedIngredients()}</ul>
      <h3>Final Price: ${totalPrice}</h3>
    </div>
  );
}
