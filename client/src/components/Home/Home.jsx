import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'

import Recipes from '../Recipes/Recipes'
import {getRecipes, getDiets, getDishes} from '../../redux/recipes/recipesSlice'
import SearchBar from '../SearchBar/SearchBar'
function Home() {
  const recipes = useSelector(state => state.recipes.recipes)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getRecipes())
      dispatch(getDiets())
      dispatch(getDishes())
  }, [dispatch])
  return (
    <main>
      <h1>Welcome to the Henry Food App</h1>
      <p>Search your favorites recipes</p>
      <SearchBar />
      <Recipes recipes={recipes}/>
    </main>
  )
}

export default Home