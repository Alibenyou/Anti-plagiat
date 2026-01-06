import React from 'react';
import ImageApp from '../images/imageApp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe,faRocket,faCoins } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Avantages.css'
function Avantage(){
    return <>
            <div className='AvantageApp'>
            <div className='avantage1'>
                <div className='btn-Avantage'>
                    <button>Avantages de notre L'application</button>
                    <div className='Avantage1'>
                        <div style={{display : 'flex',alignItems:'center',}}>
                            <FontAwesomeIcon icon={faRocket} color='white' />
                            <p>Rapide</p>
                        </div>
                        <p>Numérisez des millions de document  et de sites Web en quelques secondes.</p>
                            
                    </div>
                    <div className='Avantage2'>
                        <div style={{display : 'flex',alignItems:'center',}}>
                            <FontAwesomeIcon icon={faGlobe} color='blue'/>
                            <p>Support multilingue</p>
                        </div>
                        <p>Nous prenons en charge plusieurs
                           langues, ce qui facilite la validation
                           de l'originalité de votre contenu.</p>
                    </div>
                    <div className='Avantage3'>
                        <div style={{display : 'flex',alignItems:'center',}}>
                            <FontAwesomeIcon icon={faCoins} color='orange' />
                            <p>Gratuit</p>
                        </div>
                        <p>la plupart de fonctionnalite est free</p>
                    </div>
                </div>
            </div>
            
            <img src={ImageApp} alt="image" />
        </div>
           </>
}
export default Avantage;