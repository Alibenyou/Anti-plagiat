import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faUserPlus} from '@fortawesome/free-solid-svg-icons';

import '../Styles/Footer.css'
function Footer(){
    return <>
            <div className="footer">
                <div className='Divfooter'>
                    <h2>Anti-plagiat</h2>
                    <p>Qui sommes-nous ?</p>
                    <p>Notre démarche d'accompagnement</p>
                    <p>Paramétrage Cookies</p>
                    <p>Centre d'aide</p>
                </div>
                <div className='Divfooter'>
                    <h2>Avantages pour les Etudiants</h2>
                    <p>Détection similitudes</p>
                    <p>Créer un compte</p>
                    <p>C'est quoi le plagiat</p>
                    <p>Comment éviter le plagiat ?</p>
                    <p>Guides et conseils</p>
                    <p>Centre d'aide</p>
                </div>
                <div className='Divfooter'>
                    <h2>Avantages pour les Enseignants</h2>
                    <p>Détection similitudes</p>
                    <p>Détection de contenu IA</p>
                    <p>Créer un compte Enseignant</p>
                    <p></p>
                </div>
            </div>
            <div className='Reseaux'>
                <div className='Reseaux-sociaux'>
                    <h2>Nous suivre : </h2>
                    <a href=""><FontAwesomeIcon icon={faFacebook} fontSize={"40px"} color='blue'/></a>
                    <a href=""><FontAwesomeIcon icon={faXTwitter} fontSize={"40px"} /></a>
                    <a href=""><FontAwesomeIcon icon={faYoutube} fontSize={"40px"} color='red'/></a>
                </div>
                <div>
                   <h3>Inscrivez-vous et béneficier nos fonctionnalités :</h3>  
                    <button className='btn-inscription'>S'inscrire gratuitement<FontAwesomeIcon icon={faUserPlus} style={{marginLeft:'10px'}} /></button>
                </div>
               
            </div>
            <div style={{margin:'40px', display:'flex', justifyContent:'flex-end'}}>
                &copy; 2026 Anti-plagiat. Tout droit reservé
            </div>
           </>
}

export default Footer;