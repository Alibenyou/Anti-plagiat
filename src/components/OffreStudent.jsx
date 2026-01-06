import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import '../Styles/OffreStudent.css'
import StudentImage from '../images/student.jpg'
function OffreStudent(){
    return <>
            <div className='Offrestudent'>
                <div className='divoffre'>
                    <div className='div1'>
                        <button>Offre Etudiant</button>
                    </div>
                    <div className='Studentoffre'>
                        <p><FontAwesomeIcon icon={faCircleCheck} color='blue'/>
                           Vérifiez vos devoirs avant rendu final</p>
                        <p><FontAwesomeIcon icon={faCircleCheck} color='blue'/>
                           Évitez les sanctions liées au plagiat 
                           et à l’usage inapproprié de l’IA</p>
                    </div>
                    <button>Inscrivez-vous gratuitement</button>
                </div>
            </div>
           </>
}
export default OffreStudent;