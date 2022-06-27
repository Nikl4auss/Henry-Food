import axios from 'axios';

const baseUrl = 'http://localhost:3001';

async function getAllRecipes(filters = {}){
    const filtersParams = Object.keys(filters)
    try{
        console.log('You are here')
        const query = filtersParams.reduce((acc, key) => {
            if(filters[key]){
                if(Array.isArray(filters[key])){
                    if(filters[key].length){
                    return acc + `${key}=${filters[key].join(',')}&`;
                    }
                    return acc + ''
                }
                return acc + `${key}=${filters[key]}&`;
            }
            return acc + ''
        }, '?')
        const {data} = await axios.get(`${baseUrl}/recipes${query}`);
        return data;
        
    }
    catch(error){
        console.log(error)
        return []
    }
}

async function getRecipes(id){
    try{
        const {data} = await axios.get(`${baseUrl}/recipes/${id}`);
        return data;
    }
    catch(error){
        console.log(error)
        return {}
    }
}

async function createRecipe(recipe){
    try{
        const {data} = await axios.post(`${baseUrl}/recipes`, recipe);
        return data;
    }
    catch(error){
        console.log(error)
        return {}
    }
}

async function getDiets(){
    try{
        const {data} = await axios.get(`${baseUrl}/types/diets`);
        return data;
    }
    catch(error){
        console.log(error)
        return []
    }
}

async function getDishes(){
    try{
        const {data} = await axios.get(`${baseUrl}/types/dishes`);
        return data;
    }
    catch(error){
        console.log(error)
        return []
    }
}

export default {
    getAllRecipes,
    getRecipes,
    createRecipe,
    getDiets,
    getDishes,
}