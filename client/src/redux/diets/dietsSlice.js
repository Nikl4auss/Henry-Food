import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    diets: []
}

export const dietsSlice = createSlice({
    name: "diets",
    initialState,
    reducers: {
        setDiets: (state, action) => {
            state.diets = action.payload;
        }
    }
})

export const { setDiets } = dietsSlice.actions;

export default dietsSlice.reducer;