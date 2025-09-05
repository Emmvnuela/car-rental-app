import React from 'react';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <img src={logo} alt="vu logo" style={styles.logo} />
          <span style={styles.text}></span>
        </div>

        {/* Liens utiles */}
        <div style={styles.links}>
          <a href="/about" style={styles.link}>À propos</a>
          <a href="/contact" style={styles.link}>Contact</a>
          <a href="/faq" style={styles.link}>FAQ</a>
          <a href="/terms" style={styles.link}>Conditions</a>
          <a href="/privacy" style={styles.link}>Confidentialité</a>
        </div>

        {/* Droits d’auteur */}
        <p style={styles.rights}>
          &copy; {new Date().getFullYear()} ʋu. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#ea580c',
    padding: '20px 0',
    color: 'white',
    fontSize: '0.875rem',
    marginTop: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logo: {
    height: '150px',
  },
  text: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    letterSpacing: '0.05em',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
  },
  rights: {
    fontSize: '0.75rem',
    color: '#fef3c7',
  },
};

export default Footer;
