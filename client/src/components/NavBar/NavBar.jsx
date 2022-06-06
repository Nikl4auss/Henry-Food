import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import styles from './NavBar.module.css'
function NavBar() {
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <li className={styles.nav_item}>
            <NavButton path='/home' text={'Home'}/>
          </li>
          <li>
            <NavButton path="/recipe/create" text={'Create Recipe'} />
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

function NavButton({path, text}){
  return (
    <NavLink to={path} className={({isActive}) => isActive ? `${styles['nav_link']} ${styles['nav_link--active']} ` : styles['nav_link']}>
      {text}
    </NavLink>
  )
}

export default NavBar