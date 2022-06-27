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
    }
}

async function getRecipes(id){
    const {data} = await axios.get(`${baseUrl}/recipes/${id}`);
    return data;
}

async function getDiets(){
    const {data} = await axios.get(`${baseUrl}/types/diets`);
    return data;
}

async function getDishes(){
    const {data} = await axios.get(`${baseUrl}/types/dishes`);
    return data;
}

export default {
    getAllRecipes,
    getRecipes,
    getDiets,
    getDishes
}