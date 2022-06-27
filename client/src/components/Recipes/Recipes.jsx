import { useCallback, useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import RecipeCard from '../Recipe/RecipeCard/RecipeCard'
import Pagination from '../Pagination/Pagination'

import {ReactComponent as ArrowIcon} from '../../assets/icons/angle-down-solid.svg'
import { sortRecipes } from '../../redux/recipes/recipesSlice'
import styles from './Recipes.module.css'

function Recipes() {
  const {recipes, isLoading} = useSelector(state => state.recipes)
  const dispatch = useDispatch()

  const [menuOpen, setMenuOpen] = useState(false)
  const [sortValue, setSortValue] = useState('title')
  const [currentPage, setCurrentPage] = useState(1)
  const recipesPerPage = 9
  const totalPages = Math.ceil(recipes?.length / recipesPerPage) || 0
  const sortParams = ['title', 'points', 'healthScore']

  
  function sortBy(value){
    dispatch(sortRecipes(value))
    setCurrentPage(1)
  }


  useEffect(() => {
    if(recipes.length){
      dispatch(sortRecipes('title'))
      setCurrentPage(1)
    }
  }, [dispatch, recipes])
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <p className={styles.menu_title}>Order by {' '}
            <button className={styles.menu_button} onClick={() => setMenuOpen(!menuOpen)}>
              <span className={styles.menu_current}>{sortValue}
              </span>
              <ArrowIcon
                className={`${styles.menu_icon} ${menuOpen ? styles['menu_icon--rotated'] : ''}`}
              />
            </button>
          </p>
        
        <ul className={`${styles.menu_items} ${menuOpen ? styles['menu_items--open'] : ''}`}>
          {sortParams.map(param => {
            return (
              <li 
              key={param} 
              className={`${styles.menu_item} ${sortValue === param ? styles['menu_item--selected'] : ''}`}
              onClick={() => {
                setSortValue(param)
                sortBy(param)
              }}
              >
                {param}
              </li>
            )
          })
          
          }
        </ul>
      </div>
        {recipes?.length
          ? (
            <>
              <div className={styles.recipes}>
                {recipes.slice(recipesPerPage * (currentPage - 1), recipesPerPage * currentPage).map(recipe => {
                  return (
                    <RecipeCard 
                    key={recipe.id} id={recipe.id} 
                    title={recipe.title} image={recipe.image} 
                    diets={recipe.diets} dishes={recipe.dishes}
                    />
                  )
                })}
              </div>
              <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage}/>
            </>
          )
          : 
          isLoading ? (
            <>
              <p>...Loading</p>
            </>
          )
          :
          <p>No recipes found</p>
        }
    </div>
  )
}

export default Recipes