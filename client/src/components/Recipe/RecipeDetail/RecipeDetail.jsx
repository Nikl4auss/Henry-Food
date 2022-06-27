import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getCurrentRecipe } from '../../../redux/recipes/recipesSlice'
import styles from './RecipeDetail.module.css'
function RecipeDetail() {
  const {currentRecipe: recipe, isLoading} = useSelector(state => state.recipes)
  const dispatch = useDispatch()
  const params = useParams()
  if(!isLoading && !recipe.title){
    dispatch(getCurrentRecipe(params.id))
  }
  return (
    <div className={styles.container}>
      {isLoading ? <p>Loading...</p> : 
        (<div className={styles.recipe_container}>
          <img className={styles.img} src={recipe.image} alt={recipe.title} />
          <section className={styles.recipe_info}>
            <h1 className={styles.title}>{recipe.title}</h1>
            <div className={styles.recipe_reception}>
              <p>Points {recipe.points}</p>
              <p>Health Score {recipe.healthScore}</p>
            </div>
            {/* <section className={styles.info_group}>
              <p className={styles.info_name}>Diets </p>
              <ul className={styles.info_params}>
                {recipe.diets.map((diet, inx) => <li className={styles.info_param} key={inx}>{diet}</li>)}
              </ul>
            </section> */}
            {recipe.diets?.length > 0 && (
                <section className={styles.info_group}>
                  <p className={styles.info_name}>Diets </p>
                  <ul className={styles.info_params}>
                    {recipe.diets.map((diet, inx) => <li className={styles.info_param} key={inx}>{diet}</li>)}
                  </ul>
                </section>
              )}
              {recipe.dishes?.length > 0 && (
                <section className={styles.info_group}>
                  <p className={styles.info_name}>Dishes </p>
                  <ul className={styles.info_params}>
                    {recipe.dishes.map((dish, inx) => <li className={styles.info_param} key={inx}>{dish}</li>)}
                  </ul>
                </section>
              )}
                        
            <section className={styles.info_group}>
              <h2 className={styles.info_name}>Summary </h2>
              <p className={styles.info_text}>{recipe.summary || 'Summary not found'}</p>
            </section>
            <section className={styles.info_group}>
              <h2 className={styles.info_name}>Instructions</h2>
              <p className={styles.info_text}>{recipe.instructions || 'Instructions not found'}</p>
            </section>
          </section>
        </div>)
      }
    </div>
  )
}

export default RecipeDetail