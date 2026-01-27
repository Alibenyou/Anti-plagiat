import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Styles/OffreStudent.css';

function OffreStudent() {
  return (
    <div className="Offrestudent">
      <div className="divoffre">
        <div className="div1">
          <button>Offre Étudiant</button>
        </div>

        <div className="Studentoffre">
          <p>
            <FontAwesomeIcon icon={faCircleCheck} />
            Vérifiez vos devoirs avant rendu final
          </p>
          <p>
            <FontAwesomeIcon icon={faCircleCheck} />
            Évitez les sanctions liées au plagiat et à l’usage inapproprié de l’IA
          </p>
        </div>

        <Link to="/inscription">
          <button className="btn-offreStudent">Inscrivez-vous gratuitement</button>
        </Link>
      </div>
    </div>
  );
}

export default OffreStudent;
