// netlify/functions/getRecipe.js
const Anthropic = require('@anthropic-ai/sdk');

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to 
include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Also prepare the meal for 2 people and specify it please
`;

exports.handler = async function(event, context) {
    const { ingredientsArr } = JSON.parse(event.body);
    const ingredientsString = ingredientsArr.join(", ");

    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
    });

    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ recipe: msg.content[0].text }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
