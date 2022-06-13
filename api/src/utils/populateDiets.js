const {getApiRecipes} = require('../utils/recipesUtils')
const {Diet} = require('../db.js');


module.exports = async function populateDiets() {
    const recipes = await getApiRecipes()
    const diets = recipes.reduce((acc, recipe) => {
        if(recipe.diets){
            recipe.diets.forEach(diet => {
                if(!acc.includes(diet)){
                    acc.push(diet)
                }
            })
        }
        return acc;
    }, [])
    await Diet.bulkCreate(diets.map(diet => ({name: diet})));
}