const dietsRouter = require('express').Router();
const { Diet } = require('../db');

dietsRouter.get('/', async (req, res) => {
    
    try{
        const diets = await Diet.findAll({
            attribute: ['name']
        });
        res.json(diets.map(diet => diet.name));
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Could not get diets')
    }
    
})

module.exports = dietsRouter;