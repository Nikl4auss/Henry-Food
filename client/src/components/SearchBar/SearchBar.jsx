import React from 'react'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getRecipes} from '../../redux/recipes/recipesSlice'

function SearchBar() {
    const [filters, setFilters] = useState({
        name: '',
        diets: [],
        dishes: []
    })
    const {diets, dishes} = useSelector(state => state.recipes)
    const dispatch = useDispatch()

    function handleCheck(event){
        const {name, value, checked} = event.target
        if(checked){
          setFilters({...filters, [name]: filters[name].concat(value)})
        }
        else{
          setFilters({...filters, [name]: filters[name].filter(item => item !== value)})
        }
    }
    function searchRecipe(event){
        event.preventDefault()
        dispatch(getRecipes(filters))
    }
  return (
    <form onSubmit={searchRecipe}>
        <input type="text" placeholder="Search" value={filters.name} onChange={(event) => setFilters({...filters, name: event.target.value})}/>
        <div>
          <p>Filter by:</p>
          <div>
            <p>Diet type</p>
            {diets.map(diet => {
              return <label key={diet}>{diet}<input type="checkbox" value={diet} name="diets" onChange={handleCheck}/></label>
            })}
          </div>
          <div>
            <p>Dish type</p>
            {dishes.map(dish => {
              return <label key={dish}>{dish}<input type="checkbox" value={dish} name='dishes' onChange={handleCheck}/></label>
            })}
          </div>
          <div>

          </div>
        </div>
        <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar