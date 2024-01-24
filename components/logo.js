import Link from 'next/link'
import styles from 'styles/logo.module.css'

const Logo = ({ boxOn = false }) => {
  return (
    <ul>
      <li>
        <Link className={boxOn ? styles.box : styles.basic} href='/'>
          CUBE
        </Link>
      </li>
    </ul>
  )
}

export default Logo
