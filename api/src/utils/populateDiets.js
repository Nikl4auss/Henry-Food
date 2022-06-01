const {Diet} = require('../db.js');

const diets = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30"];

module.exports = async function populateDiets() {
    await Promise.all(diets.map(async diet => {
        await Diet.create({
            name: diet
        })
    }))
}