const axios = require('axios')
const {Recipe, Diet, Dish} = require('../db')
const {API_KEY} = require('../utils/config')

async function getApiRecipes(){
    try{
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
        const {data} = await axios.get(url);
        return data.results;
    }
    catch(error){
        console.log(error)
        return []
    }
}

async function getDBRecipes(){
    const recipes = await Recipe.findAll({
        include: [{
            model: Diet,
            as: 'diets',
            attributes: ['name']
        },
        {
            model: Dish,
            as: 'dishes',
            attributes: ['name']
        }
    ]
    });
    console.log(recipes)
    return recipes.map(recipe => {
        return {
            ...recipe.dataValues,
            diets: recipe.diets.map(diet => diet.name),
            dishes: recipe.dishes.map(dish => dish.name)
        }
    });
}

function restrucutreRecipe(recipe){
    if(recipe.analyzedInstructions?.length){
        recipe.instructions = recipe.analyzedInstructions[0].steps.map(step => step.step).join('\n');
    }
    return {
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary?.replace(/<\/?.*?>/gi, ''),
        points: recipe.aggregateLikes,
        healthScore: recipe.healthScore,
        instructions: recipe.instructions,
        image: recipe.image,
        diets: recipe.diets,
        dishes: recipe.dishTypes|| recipe.dishes
    }
}

function restructureRecipes(recipes){
    return recipes.map(recipe => restrucutreRecipe(recipe))
}

module.exports = {
    getApiRecipes,
    getDBRecipes,
    restructureRecipes,
    restrucutreRecipe
}