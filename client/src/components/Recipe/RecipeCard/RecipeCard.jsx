import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'

import { getCurrentRecipe } from '../../../redux/recipes/recipesSlice'
import styles from './RecipeCard.module.css'

function RecipeCard({id, title, image ,diets, dishes}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function redirectToRecipe() {
    dispatch(getCurrentRecipe(id))
    navigate(`/recipe/${id}`)
  }
  return (
    <div className={styles.container} onClick={redirectToRecipe}>
        <img className={styles.img} src={image} alt={title}/>
        <p className={styles.title}>{title}</p>
        <p className={styles.info_name}>Diets</p>
        {diets.length 
          ? (
            <ul className={styles.info_params}>
              {diets?.map((diet, inx) => <li className={styles.info_param} key={inx}>{diet}</li>)}
            </ul>
          )
          : <p>No diets information</p>
        }
        
        <p className={styles.info_name}>Dishes</p>
        {dishes.length
          ? (
            <ul className={styles.info_params}>
              {dishes?.map((dish, inx) => <li key={inx} className={styles.info_param}>{dish}</li>)}
            </ul>
          )
          : <p>No dishes information</p>
        }
        
    </div>
  )
}

export default RecipeCard