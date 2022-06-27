import { configureStore } from '@reduxjs/toolkit'
import recipes from './recipes/recipesSlice'
export const store = configureStore({
    reducer: {
        recipes,
    }
})