const recipesRouter = require('express').Router();
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const {API_KEY} = require('../utils/config');

recipesRouter.get('/', async (req, res) => {
    
    const {name} = req.query
    let recipes = []
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
    
    try {
        const {data} = await axios.get(url);
        recipes.push(...data.results);
        const dbRecipes = await Recipe.findAll({
            include: [{
                model: Diet,
                as: 'diets',
                attributes: ['name']
            }]
        });
        recipes.push(...dbRecipes);
        recipes = recipes.map(recipe => {
            if(recipe.analyzedInstructions?.length){
                recipe.instructions = recipe.analyzedInstructions[0].steps.map(step => step.step).join('\n');
            }
            return {
                id: recipe.id,
                title: recipe.title,
                summary: recipe.summary,
                points: recipe.aggregateLikes,
                healthScore: recipe.healthScore,
                instructions: recipe.instructions,
                image: recipe.image,
                diets: recipe.diets,
                dishes: recipe.dishTypes|| recipe.dishes
            }
        }) 

        if(name){
            let filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()))
            return res.status(200).json(filteredRecipes);
        }
        return res.status(200).json(recipes);
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
                return res.json(data)
            }
            if(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idRecipe)){
                const recipe = await Recipe.findOne({where: {id: idRecipe}});
                if(recipe){
                    return res.json(recipe)
                }
                return res.status(404).send('Recipe not found')
            }

        } catch (error) {
            
        }
        
    }
})

recipesRouter.post('/', async (req, res) => {
    
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
                const dbDish = await Diet.findOne({where: {name: dish}});
                await recipe.addDish(dbDish);
            }))
        }
        const recipeDiets = await recipe.getDiets({attributes: ['name'], joinTableAttributes: []})
        const recipeDishes = await recipe.getDishes({attributes: ['name'], joinTableAttributes: []})
        res.json({...recipe.toJSON(), diets: recipeDiets, dishes: recipeDishes})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send('Could not save recipe')
    }
})

module.exports = recipesRouter;