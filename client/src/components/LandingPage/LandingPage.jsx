import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

import styles from './LandingPage.module.css'
function LandingPage() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/home')
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Welcome to Foodie</h1>
        <p className={styles.subtitle}>Explore and search hundres of recipes of various diets plans, start <button onClick={handleClick} className={styles.calltoaction}>Here</button></p>
      </div>

    </div>
  )
}

export default LandingPage