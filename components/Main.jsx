import React from "react";

export default function Main() {

    let ingredients = [];


    const ingredientLi = ingredients.map(ingredient => {
        <li key={ingredient}>
            {ingredient}
        </li>
    });

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const newIngredient = formData.get("ingredient")
        ingredients.push(newIngredient);
        console.log(newIngredient);
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>add ingredient</button>
            </form>
            <ul>
                {ingredientLi}
            </ul>
        </main>
    )
}