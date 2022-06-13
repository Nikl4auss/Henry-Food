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
    dishes: []

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
        setCurrentRecipe: (state, action) => {
            state.currentRecipe = action.payload;
        },
        setDiets: (state, action) => {
            state.diets = action.payload;
        },
        setDishes: (state, action) => {
            state.dishes = action.payload;
        }
    }
}) 

export const { setRecipes, addRecipe, setCurrentRecipe, setDiets, setDishes } = recipesSlice.actions;

export function getRecipes(filters = {}) {
    return async dispatch => {
        try {
            const recipes = await recipesServices.getAllRecipes(filters);
            dispatch(setRecipes(recipes));
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