const {getApiRecipes} = require('../utils/recipesUtils')

const {Dish} = require('../db');

module.exports = async () => {
    try{

        const recipes = await getApiRecipes()
        const dishes = recipes.reduce((acc, recipe) => {
            if(recipe.dishTypes){
                recipe.dishTypes.forEach(dish => {
                    if(!acc.includes(dish)){
                        acc.push(dish)
                    }
                })
            }
            return acc;
        }, [])
    
        await Dish.bulkCreate(dishes.map(dish => ({name: dish})));
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Could not get dishes')
    }
}