import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dishes: []
}

export const dishesSlice = createSlice({
    name: "dishes",
    initialState,
    reducers: {
        setDishes: (state, action) => {
            state.dishes = action.payload;
        }
    }
})

export const { setDishes } = dishesSlice.actions;

export default dishesSlice.reducer;