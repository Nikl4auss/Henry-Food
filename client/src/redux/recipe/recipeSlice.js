import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    id: "",
    title: "",
    summary: "",
    points: 0,
    healthScore: 0,
    instructions: "",
    image: "",
    diets: [],
    dishes: [],
}

export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        setRecipe: (state, action) => {
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.summary = action.payload.summary;
            state.points = action.payload.points;
            state.healthScore = action.payload.healthScore;
            state.instructions = action.payload.instructions;
            state.image = action.payload.image;
            state.diets = action.payload.diets;
            state.dishes = action.payload.dishes;
        }
    }
})

export const { setRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;