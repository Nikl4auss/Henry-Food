const axios = require('axios')
const {Recipe, Diet, Dish} = require('../db')
const {API_KEY} = require('../utils/config')

async function getApiRecipes(){
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
    const {data} = await axios.get(url);
    return data.results;
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
    return recipes;
}

module.exports = {
    getApiRecipes,
    getDBRecipes
}