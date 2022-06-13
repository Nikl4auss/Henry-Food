import React from 'react'
import RecipeCard from '../Recipe/RecipeCard/RecipeCard'
import {useSelector} from 'react-redux'
function Recipes() {
  const recipes = useSelector(state => state.recipes.recipes)
  return (
    <div>
      {recipes?.length
        ? recipes.map(recipe => {
          return (
            <RecipeCard 
            key={recipe.id} id={recipe.id} 
            title={recipe.title} image={recipe.image} 
            diets={recipe.diets} dishes={recipe.dishes}
            />
          )
        })
        : <p>No recipes found</p>
      }
    </div>
  )
}

export default Recipes