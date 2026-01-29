import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Styles/OffreTeacher.css'

function Offresteacher() {
  return (
    <div className="Offresteacher">
      <div className="divoffreteacher">
        <div className="div1teacher">
          <button>Offre Enseignant</button>
        </div>

        <div className="teacheroffre">
          <p>
            <FontAwesomeIcon icon={faCircleCheck} color="blue" />
            Sensibilisez au respect de la propriété intellectuelle
          </p>
          <p>
            <FontAwesomeIcon icon={faCircleCheck} color="blue" />
            Évaluez les travaux avec des logiciels anti-plagiat et détecteurs d'IA performants
          </p>
        </div>

        <Link to="/inscription">
          <button className="btn-offreteacher">Inscrivez-vous gratuitement</button>
        </Link>
      </div>
    </div>
  );
}

export default Offresteacher;
