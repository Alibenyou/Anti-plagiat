import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faUserPlus} from '@fortawesome/free-solid-svg-icons';
import '../Styles/Header.css'

function Header(){
    return <>
            <div className='header'>
            <h2>Anti-plagiat</h2>
            <ul>
                <li><a href="#Aide">Aide</a></li>
                <li><a href="#Apropos">Apropos</a></li>
                <li><a href="#contact">Nous contacter</a></li>
            </ul>
            <div className='btn'>
                <button className='btn-inscrire'>S'inscrire <FontAwesomeIcon icon={faUser} /></button>
                <button className='btn-connexion'>Connexion <FontAwesomeIcon icon={faUserPlus} /></button>
            </div>
        </div>
          </>
}

export default Header;