const dishesRouter = require('express').Router();
const {Dish} = require('../db');

dishesRouter.get('/', async (req, res) => {
    try {
        const dishes = await Dish.findAll({
            attributes: ['name']
        });
        return res.json(dishes.map(dish => dish.name));
        
    } catch (error) {
        console.log(error)
        return res.status(500).send('Could not get dishes')    
    }
})

module.exports = dishesRouter;