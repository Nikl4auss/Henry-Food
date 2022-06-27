import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'

import {getRecipes, getDiets, getDishes} from '../../redux/recipes/recipesSlice'
import Recipes from '../Recipes/Recipes'
import SearchBar from '../SearchBar/SearchBar'
import Pagination from '../Pagination/Pagination'
import styles from './Home.module.css'
function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getRecipes())
      dispatch(getDiets())
      dispatch(getDishes())
  }, [dispatch])
  return (
    <main>

      <h1 className={styles.title}>Welcome to the Henry Food App</h1>
      <p className={styles.subtitle}>Search your favorites recipes</p>
      <SearchBar />
      <Recipes />
    </main>
  )
}

export default Home