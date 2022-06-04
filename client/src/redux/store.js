import { configureStore } from '@reduxjs/toolkit'
import recipes from './recipes/recipesSlice'
import recipe from './recipe/recipeSlice'
import diets from './diets/dietsSlice'
import dishes from './dishes/dishesSlice'
export const store = configureStore({
    reducer: {
        recipes,
        recipe,
        diets,
        dishes
    }
})