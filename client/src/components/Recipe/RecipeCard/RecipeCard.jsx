import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './RecipeCard.module.css'

function RecipeCard({id, title, image ,diets, dishes}) {
  const navigate = useNavigate()
  return (
    <div className={styles.container} onClick={() => navigate(`/recipe/:${id}`)}>
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