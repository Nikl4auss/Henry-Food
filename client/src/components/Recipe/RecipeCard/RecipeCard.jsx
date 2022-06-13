import React from 'react'
import { useNavigate } from 'react-router-dom'
function RecipeCard({id, title, image ,diets, dishes}) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/recipe/:${id}`)}>
        <p>{title}</p>
        <img src={image} alt={title}/>
        <p>Diets</p>
        {diets.length 
          ? (
            <ul>
              {diets?.map((diet, inx) => <li key={inx}>{diet}</li>)}
            </ul>
          )
          : <p>No diets information</p>
        }
        
        <p>Dishes</p>
        {dishes.length
          ? (
            <ul>
              {dishes?.map((dish, inx) => <li key={inx}>{dish}</li>)}
            </ul>
          )
          : <p>No dishes information</p>
        }
        
    </div>
  )
}

export default RecipeCard