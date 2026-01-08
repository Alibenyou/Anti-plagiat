import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faGraduationCap,faChalkboardUser, faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import '../Styles/home.css';
import Avantage from '../components/Avantages';
import OffreStudent from '../components/OffreStudent';
import Offresteacher from '../components/OffreTeacher';
import Avistudent from '../components/AvisStudent';
import Avisteacher from '../components/Avisteacher';
import Footer from '../components/Footer';

function Home() {
    return <>
        <Header/>
        <div className='div1'>
         <div className='div2'>
            <div className='div3'>
                <textarea name="text" id="text" placeholder='Entrer du text a verifier'></textarea>
                <div className='btn-text'>
                    <button className='detection'>Detecter le texte</button>
                    <button className='televerser'>Televerser un document
                         <FontAwesomeIcon icon={faArrowUpFromBracket} color='blank'/></button>
                </div>
            </div>
            <div className='comment'>
                <p><FontAwesomeIcon icon={faCircleCheck} />Logiciel Anti-plagiat</p>
                <p><FontAwesomeIcon icon={faCircleCheck} />Logiciel de detection de Contenu IA</p>
            </div>
         </div>
        </div>
        <div className='whatuser'>
            <button>Vous êtes Etudiant <FontAwesomeIcon icon={faGraduationCap} />?</button>
            <button>Vous êtes Enseignant <FontAwesomeIcon icon={faChalkboardUser} />?</button>
        </div>
        <Avantage/>
        <OffreStudent/>
        <Avistudent/>
        <Offresteacher/>
        <Avisteacher/>
        <hr />
        <Footer/>
        <Link to='/student'>Page Student</Link>
        <Link to='/teacher'>Page Teacher</Link>
        <Link to='/admin'>Page Admin</Link>
     </>
}

export default Home;