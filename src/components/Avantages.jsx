import React from 'react';
import ImageApp from '../images/imageApp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faRocket, faCoins } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Avantages.css'

function Avantage() {
  return (
    <div className="AvantageApp">
      <div className="avantage-left">
        <button className="btn-avantage">
          Avantages de notre application
        </button>

        <div className="avantage-card">
          <div className="icon-title">
            <FontAwesomeIcon icon={faRocket} />
            <p>Rapide</p>
          </div>
          <p className="desc">
            Numérisez des millions de documents et de sites Web en quelques secondes.
          </p>
        </div>

        <div className="avantage-card">
          <div className="icon-title">
            <FontAwesomeIcon icon={faGlobe} />
            <p>Support multilingue</p>
          </div>
          <p className="desc">
            Nous prenons en charge plusieurs langues, ce qui facilite la validation
            de l'originalité de votre contenu.
          </p>
        </div>

        <div className="avantage-card">
          <div className="icon-title">
            <FontAwesomeIcon icon={faCoins} />
            <p>Gratuit</p>
          </div>
          <p className="desc">
            La plupart des fonctionnalités sont gratuites.
          </p>
        </div>
      </div>

      <div className="avantage-right">
        <img src={ImageApp} alt="image" />
      </div>
    </div>
  )
}

export default Avantage;