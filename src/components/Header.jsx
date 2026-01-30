import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';
import Logo from '../images/logo.png';
import ButtonLangue from './ButtonLangue';
import { useState } from 'react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
      {/* Hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
      </button>

      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="Logo" />
        <h2>Anti-plagiat</h2>
        <div className='BtnInscription'>
                <Link to="/inscription"><FontAwesomeIcon icon={faUserPlus} /></Link>
            
                <Link to="/connexion"><FontAwesomeIcon icon={faUser} /></Link>
        </div>
      </div>

      {/* Menu */}
      <ul className={menuOpen ? "nav open" : "nav"}>
        <li><a href="#Aide">Aide</a></li>
        <li><a href="#Apropos">Apropos</a></li>
        <li><a href="#contact">Nous contacter</a></li>
        <li><Link to="/pertinence">Pertinence</Link></li>
      </ul>

      {/* Buttons */}
      <div className="btn">
        <ButtonLangue />

        <Link to="/inscription">
          <button className="btn-inscrire">
            S'inscrire <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </Link>

        <Link to="/connexion">
          <button className="btn-connexion">
            Connexion <FontAwesomeIcon icon={faUser} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;