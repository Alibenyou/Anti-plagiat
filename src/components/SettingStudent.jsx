import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentsDollar } 
                from '@fortawesome/free-solid-svg-icons';
import '../Styles/SettingStudent.css' 
function SettingStudent(){
     return <>
            <div>
              <h2><FontAwesomeIcon icon={faCommentsDollar} /> Paramètres</h2>
              <div className='Parametrebtn'>
                <button className='Bouton'>Profil</button>
                <button className='Bouton'>Actions</button>
                <button className='Bouton'>Achats</button>
              </div>
            </div>
            </>
}
const styles = {
  Parametrebtn:{
    gap:'10px'
  },
  Bouton:{
    marginRight:'10px'
  }
}
export default SettingStudent;