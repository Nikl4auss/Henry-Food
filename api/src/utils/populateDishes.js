const {Dish} = require('../db');

const dishes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"];

module.exports = async () => {
    await Dish.bulkCreate(dishes.map(dish => ({name: dish})));
}