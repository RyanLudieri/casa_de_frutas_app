// NavBar.jsx
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'; // ajuste o caminho se estiver diferente

const NavBar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src="/logo.png" alt="Logo da Casa de Frutas" className={styles.logo} />
        </Link>
        <h1 className={styles.title}>Casa de Frutas do Tiaozinho</h1>
      </div>

      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Home</Link>
      </nav>
    </header>
  );
};

export default NavBar;
