import React from 'react'

import {ReactComponent as LeftArrow} from '../../assets/icons/angle-left-solid.svg'
import {ReactComponent as DoubleLeftArrow} from '../../assets/icons/angles-left-solid.svg'
import {ReactComponent as RightArrow} from '../../assets/icons/angle-right-solid.svg'
import {ReactComponent as DoubleRightArrow} from '../../assets/icons/angles-right-solid.svg'
import styles from './Pagination.module.css'
function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const pages = []
  for(let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }
  return (
    <div className={styles.container}>
      <DoubleLeftArrow className={styles.arrow} onClick={() => setCurrentPage(1)} />
      <LeftArrow className={styles.arrow} onClick={() => setCurrentPage(currentPage => currentPage - 1)}/>
      <ul className={styles.pages}>
        {pages.map(page => {
            return (
              <li key={page} className={`${styles.page} ${currentPage === page ? styles['page--selected'] : ''}`}>
                <button onClick={() => setCurrentPage(page)}>{page}</button>
              </li>
            )
          }
        )}
      </ul>
      <RightArrow className={styles.arrow} onClick={() => setCurrentPage(currentPage => currentPage + 1)}/>
      <DoubleRightArrow className={styles.arrow} onClick={() => setCurrentPage(totalPages)}/>
    </div>
  )
}

export default Pagination