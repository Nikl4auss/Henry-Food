import React from 'react'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getRecipes} from '../../redux/recipes/recipesSlice'
import {ReactComponent as FilterIcon} from '../../assets/icons/filter-solid.svg'

import styles from './SearchBar.module.css'

function SearchBar() {
    const [filters, setFilters] = useState({
        title: '',
        diets: [],
        dishes: []
    })
    const [showFilters, setShowFilters] = useState(false)
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
    <form onSubmit={searchRecipe} className={styles.form__container}>
        <div className={styles.form__searchbar_container}>
          <input className={styles.form__searchbar_field} type="text" placeholder="Recipe Title" value={filters.title} onChange={(event) => setFilters({...filters, title: event.target.value})}/>
          <button className={styles.form__searchbar_button} type="submit">Search</button>
        </div>

        <div className={styles.form__filter_container}>
          <button type='button' className={styles.form__filter_button} onClick={() => showFilters ? setShowFilters(false) : setShowFilters(true)}>
            Filter by
            <FilterIcon className={styles.form__filter_icon}/>
          </button>
          <div className={`${styles.form__filter_groups} ${showFilters ? styles.form__filter_groups_active : ''}`}>
            <div className={styles.form__filter_group}>
              <p>Diet type</p>
              <div>
                {diets.map(diet => {
                  return <label key={diet}><input type="checkbox" value={diet} name="diets" onChange={handleCheck}/> {diet}</label>
                })}
              </div>
            </div>
            <div className={`${styles.form__filter_group}`}>
              <p>Dish type</p>
              <div className={styles.form__filter_params}>
                {dishes.map(dish => {
                  return <label className={styles.form__filter_param} key={dish}><input type="checkbox" value={dish} name='dishes' onChange={handleCheck}/> {dish}</label>
                })}
              </div>
          </div>

          </div>
          <div>

          </div>
        </div>
    </form>
  )
}

export default SearchBar