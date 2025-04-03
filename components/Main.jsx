import React from "react";
import Form from "./Form";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import Confetti from 'react-confetti'

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState(null);
    const recipeSection = React.useRef(null);
    
    React.useEffect(() => {
        recipe &&
        recipeSection.current !== null &&
        recipeSection.current.scrollIntoView({behavior: "smooth"})
    }, [recipe]);

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
            {recipe && <Confetti 
            numberOfPieces={2000} 
            recycle={false} 
            />}
            <Form handleAction={addIngredient} />
            {ingredients.length > 0 && <IngredientsList
            ref={recipeSection}
            ingredients={ingredients}
            displayRecipe={displayRecipe}
            />}
            {recipe ? <ClaudeRecipe recipe={recipe} />: null}
        </main>
    )
}