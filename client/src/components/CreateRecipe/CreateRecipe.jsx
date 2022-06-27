import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

import RecipeServices from '../../services/recipesServices' 
import {getDishes, getDiets} from '../../redux/recipes/recipesSlice'
import styles from './CreateRecipe.module.css'

function CreateRecipe() {
  const {diets, dishes} = useSelector(state => state.recipes)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState({
    title: '',
    summary: '',
    instructions: '',
    diets: [],
    dishes: [],
  })
  
  function handleInputs(event) {
    const {name, value} = event.target
    setRecipe({...recipe, [name]: value})
  }

  function handleCheck(event){
    const {name, value, checked} = event.target
    if(checked){
      setRecipe({...recipe, [name]: recipe[name].concat(value)})
    }
    else{
      setRecipe({...recipe, [name]: recipe[name].filter(item => item !== value)})
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try{
      const newRecipe = await RecipeServices.createRecipe(recipe)
      navigate(`/recipe/${newRecipe?.id}`)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    dispatch(getDiets())
    dispatch(getDishes())
  }, [dispatch])


  return (
    <div className={styles.container}>
      <h1>Create Recipe</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='title' className={styles.form_label}>
          Title: 
          <input type="text" id='title' placeholder='Ex: Spagheti and Meatlballs' className={styles.form_input} value={recipe.title} onChange={handleInputs} name='title'/>
        </label>
        <label htmlFor="summary" className={styles.form_label}>
          Summary: 
          <textarea className={styles.form_text} id='summary' placeholder='Add a small description here' wrap='hard' value={recipe.summary} onChange={handleInputs} name='summary'>
          </textarea>
        </label>
        <label htmlFor="instructions" className={styles.form_label}>
          Instructions:
          <textarea className={styles.form_text} id='instructions' placeholder='Add instructions here' value={recipe.instructions} onChange={handleInputs} name='instructions'>
          </textarea>
        </label>
        <div className={styles.form_info}>
          <div className={styles.form_info_group}>
            <p>Diets</p>
            <div className={styles.form_info_params}>
              {diets.map(diet => (
                <label key={diet} className={styles.form_info_param} htmlFor={diet}>
                  <input id={diet} type='checkbox' value={diet} onChange={handleCheck} name='diets'/>
                  {diet}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.form_info_group}>
            <p>Dishes</p>
            <div className={styles.form_info_params}>
              {dishes.map(dish => (
                <label key={dish} className={styles.form_info_param} htmlFor={dish}>
                  <input id={dish} type='checkbox' value={dish} name='dishes' onChange={handleCheck}/>
                  {dish}
                </label>
              ))}
            </div>
            
          </div>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreateRecipe