import React from "react";
import Form from "./Form";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState(null);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");      
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }

    async function getRecipe() {
        try {
            const response = await fetch('/.netlify/functions/getRecipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredientsArr: ingredients })
            });
            const data = await response.json();
            setRecipe(data.recipe);   // Set the recipe in the state
            console.log(data.recipe);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    }
    function displayRecipe() {
        getRecipe();  
    }

    return (
        <main>
            <Form handleAction={addIngredient} />
            {ingredients.length > 0 && <IngredientsList
            ingredients={ingredients}
            displayRecipe={displayRecipe}
            />}
            {recipe ? <ClaudeRecipe recipe={recipe} />: null}
        </main>
    )
}