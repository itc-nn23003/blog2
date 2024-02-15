import { useState } from 'react'
import Link from 'next/link'
import styles from 'styles/nav.module.css'

const Nav = () => {
  const [navIsOpen, setNavIsOpen] = useState(false)

  const toggleNav = () => {
    setNavIsOpen(prev => !prev)
  }

  const closeNav = () => {
    setNavIsOpen(false)
  }

  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      <button className={styles.btn} onClick={toggleNav}>
        MENU
      </button>

      <ul className={styles.list}>
        <li>
          <Link href='/' onClick={closeNav}>Home</Link>
        </li>
        <li>
          <Link href='/about' onClick={closeNav}>About</Link>
        </li>
        <li>
          <Link href='/blog' onClick={closeNav}>Blog</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
