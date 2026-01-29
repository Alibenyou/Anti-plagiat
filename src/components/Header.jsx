import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonLangue from "./ButtonLangue";
import "../Styles/Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="logo">
        <h2>Anti-plagiat</h2>
      </div>

      {/* Bouton menu mobile */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Menu */}
      <ul className={menuOpen ? "nav open" : "nav"}>
        <li><a href="#Aide">Aide</a></li>
        <li><a href="#Apropos">Apropos</a></li>
        <li><a href="#contact">Nous contacter</a></li>
        <li><Link to="/pertinence">Pertinence</Link></li>
      </ul>

      {/* Boutons */}
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
