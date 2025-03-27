import React from "react";

export default function Main() {

    const [ingredients, setIngredients] = React.useState([]);


    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={Math.random()}>
            {ingredient}
        </li>
    ));

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");      
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    };

    return (
        <main>
            <form action={addIngredient}>
                <label htmlFor="ingredient">Add in at least 2 ingredients to generate a recipe.</label>
                <div>
                    <input 
                        id="ingredient"
                        type="text"
                        placeholder="e.g. zucchini"
                        aria-label="Add ingredient"
                        name="ingredient"
                        required
                    />
                    <button>Add ingredient</button>
                </div>
            </form>
            {ingredients.length > 0 &&
                <section>
                    <h2>Ingredients on hand:</h2>
                    <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                    {ingredients.length > 1 && 
                        <div className="get-recipe-container">
                            <div>
                                <h3>Ready for a recipe?</h3>
                                <p>Generate a recipe from your list of ingredients.</p>
                            </div>
                            <button>Get a recipe</button>
                        </div>
                    }
                </section>
            }
        </main>
    )
}