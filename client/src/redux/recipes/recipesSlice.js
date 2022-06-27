import { createSlice } from "@reduxjs/toolkit";
import recipesServices from "../../services/recipesServices";

const initialState = {
    recipes: [],
    currentRecipe: {
        id: "",
        title: "",
        summary: "",
        points: 0,
        healthScore: 0,
        instructions: "",
        image: "",
        diets: [],
        dishes: []
    },
    diets: [],
    dishes: [],
    isLoading: false,

}

export const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = action.payload;
        }
        ,
        addRecipe: (state, action) => {
            state.recipes.push(action.payload);
        },
        sortRecipes: (state, action) => {
            console.log('here')
            if(state.recipes?.length){
                state.recipes.sort((recipe1, recipe2) => {
                    if(action.payload === "title"){
                        return recipe1.title.localeCompare(recipe2.title);
                    }
                    else if(action.payload === "points"){
                        return recipe1.points - recipe2.points;
                    }
                    else if(action.payload === "healthScore"){
                        return recipe1.healthScore - recipe2.healthScore;
                    }
                    return 0
                })
            }
            else{
                state.recipes = [];
            }
        }
        ,
        setCurrentRecipe: (state, action) => {
            state.currentRecipe = action.payload;
        },
        setDiets: (state, action) => {
            if(action.payload?.length){
                state.diets = action.payload;
            }
        },
        setDishes: (state, action) => {
            if(action.payload?.length){
                state.dishes = action.payload;
            }
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
}) 

export const { setRecipes, addRecipe, sortRecipes,setCurrentRecipe, setDiets, setDishes, setIsLoading } = recipesSlice.actions;

export function getRecipes(filters = {}) {
    return async dispatch => {
        dispatch(setIsLoading(true));
        dispatch(setRecipes([]))
        try {
            const recipes = await recipesServices.getAllRecipes(filters);
            dispatch(setRecipes(recipes));
            dispatch(setIsLoading(false));
        } catch (error) {
            console.log(error)
        }
    }
}

export function getCurrentRecipe(id) {
    return async dispatch => {
        dispatch(setIsLoading(true));
        dispatch(setCurrentRecipe({}))
        try {
            const recipe = await recipesServices.getRecipes(id);
            dispatch(setCurrentRecipe(recipe));
            dispatch(setIsLoading(false));
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDiets(){
    return async dispatch => {
        const diets = await recipesServices.getDiets();
        dispatch(setDiets(diets));
    }
}

export function getDishes(){
    return async dispatch => {
        const dishes = await recipesServices.getDishes();
        dispatch(setDishes(dishes));
    }
}

export default recipesSlice.reducer;