import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen} from '@fortawesome/free-solid-svg-icons';
function DocumentStudent(){
    return <>
            <div>
             <h2><FontAwesomeIcon icon={faFolderOpen} /> Mes documents</h2>
             <button>Ajouter des documents</button>
              {/* Ici tu listeras tes fichiers plus tard */}
            </div>
           </>
}

export default DocumentStudent;