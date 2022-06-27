const recipesRouter = require('express').Router();
const axios = require('axios');
const { Recipe, Diet, Dish } = require('../db');
const { getApiRecipes, getDBRecipes, restructureRecipes, restrucutreRecipe } = require('../utils/recipesUtils');
const {API_KEY} = require('../utils/config');


recipesRouter.get('/', async (req, res) => {
    const queryParams = Object.keys(req.query);
    const recipes = [];
    
    try {

        const apiRecipes = await getApiRecipes();
        recipes.push(...apiRecipes);
        const dbRecipes = await getDBRecipes();
        recipes.push(...dbRecipes);
        let strucutredRecipes = restructureRecipes(recipes);
        console.log(strucutredRecipes)
        if(queryParams.length){
            strucutredRecipes = strucutredRecipes.filter(recipe => {
                return queryParams.every(param => {
                    if(Array.isArray(recipe[param])){
                        return recipe[param].some(item => req.query[param].includes(item))
                    }
                    if(typeof recipe[param] === 'string'){
                        return recipe[param].toLowerCase().includes(req.query[param].toLowerCase())
                    }
                })
            })
        }

        return res.status(200).json(strucutredRecipes);
    } catch (error) {
        console.log(error)
        return res.status(500).send('Could not get recipes')
    }
    
})

recipesRouter.get('/:idRecipe', async (req, res) => {
    const {idRecipe} = req.params;
    if(idRecipe){
        try {
            if(Number(idRecipe)){
                const url = `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`;
                const {data} = await axios.get(url)

                return res.json(restrucutreRecipe(data));
            }
            if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idRecipe)){
                const recipe = await Recipe.findOne(
                    {where: {id: idRecipe}
                });
                console.log(recipe)
                const diets = await recipe.getDiets();
                const dishes = await recipe.getDishes();
                recipe.diets = diets.map(diet => diet.name);
                recipe.dishes = dishes.map(dish => dish.name);
                if(recipe){
                    return res.json(restrucutreRecipe(recipe));
                }
                return res.status(404).send('Recipe not found')
            }

        } catch (error) {
            
        }
        
    }
})

recipesRouter.post('/', async (req, res) => {
    console.log("req.body", req.body)
    const {title, summary, points, healthScore, instructions,image, diets, dishes} = req.body;
    
    if(!title || !summary) return res.status(400).send('Missing obligatory fields')

    try {
        const recipe = await Recipe.create({title, summary, points, healthScore, instructions, image })
        if(diets){
            await Promise.all(diets.map(async diet => {
                const dbDiet = await Diet.findOne({where: {name: diet}});
                await recipe.addDiet(dbDiet);
            }))
        }
        if(dishes){
            await Promise.all(dishes.map(async dish => {
                const dbDish = await Dish.findOne({where: {name: dish}});
                await recipe.addDish(dbDish);
            }))
        }
        const recipeDiets = await recipe.getDiets({attributes: ['name'], joinTableAttributes: []})
        console.log(recipeDiets)
        const recipeDishes = await recipe.getDishes({attributes: ['name'], joinTableAttributes: []})
        console.log(recipeDishes)
        res.json({...recipe.toJSON(), diets: recipeDiets, dishes: recipeDishes})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send('Could not save recipe')
    }
})

module.exports = recipesRouter;