import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faChevronRight,faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Avisteacher.css';
function Avisteacher(){
    return <>
            <div className="avisteacher">
                <FontAwesomeIcon icon={faChevronLeft} fontSize={'40px'}/>
                <div className='Avis'>
                    <div>
                        <FontAwesomeIcon icon={faQuoteLeft} fontSize={'60px'} color='violet'/>
                        <p>Khaled Oumar</p>
                    </div>
                    <div className='commentaire'>
                        C’est un excellent logiciel
                        tres rapide et gratuit, ca m’as
                        beaucoup aider
                    </div>
                </div>
                <FontAwesomeIcon icon={faChevronRight} fontSize={'40px'}/>
            </div>
           </>
}
export default Avisteacher;