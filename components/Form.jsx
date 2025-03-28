export default function Form(props) {
    return (
        <form action={props.handleAction}>
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
    )
}