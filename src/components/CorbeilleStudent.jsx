import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan }   from '@fortawesome/free-solid-svg-icons';
function CorbeilleStudent(){
    return<>
            <div>
              <h2><FontAwesomeIcon icon={faTrashCan} /> Corbeille</h2>
              <p>Voici vos documents supprimés...</p>
            </div>
          </>
}
export default CorbeilleStudent;