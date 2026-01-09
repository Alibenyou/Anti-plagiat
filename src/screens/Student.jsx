import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faCircleQuestion, faFolderClosed, faTrashCan, faCommentsDollar,faFolderOpen} 
                from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../Styles/Student.css'
import Logo from '../images/logo.png'
import ModaleNotif from '../components/ModaleNotif';
import ModalProfilStudent from '../components/ModalProfilStudent';
import DocumentStudent from '../components/DocuentStudent';
import CorbeilleStudent from '../components/CorbeilleStudent';
import SettingStudent from '../components/SettingStudent';
import ButtonLangue from '../components/ButtonLangue';
import ModaleHelp from '../components/ModaleHelp';

function Student(){
    const [isProfilOpen, setIsProfilOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('documents');
    const toggleProfil = () => {
           setIsProfilOpen(!isProfilOpen);
           setIsNotifOpen(false);
           setIsHelpOpen(false)
     };
     const toggleNotif = () => {
            setIsNotifOpen(!isNotifOpen);
            setIsProfilOpen(false);
            setIsHelpOpen(false) // Ferme le profil si il est ouvert
    };
    const toggleHelp = () =>{
        setIsHelpOpen(!isHelpOpen);
        setIsNotifOpen(false);
        setIsProfilOpen(false)
    }
    return  <>
        <div className="container">
          <header>
                <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                   <img src={Logo} alt="" />
                   <h2>Anti-plagiat</h2>
                </div>
                <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                    <p style={{color:'red', marginRight:'10px'}}>200</p> 
                    <p>Nombre de fichiers</p>
                </div>
                <div className='divUser'>
                    <ButtonLangue/>
                        <FontAwesomeIcon icon={faCircleQuestion} fontSize={'25px'} 
                         onClick={toggleHelp}
                        />
                        <FontAwesomeIcon icon={faBell} fontSize={'25px'} cursor={'pointer'}
                            onClick={toggleNotif}
                        />
                    <div style={{
                       borderRadius: '50%', 
                       backgroundColor: '#9f9ea9ff', 
                       width: '50px', height: '50px',
                       display: 'flex', justifyContent: 'center', alignItems: 'center', // Centrage parfait
                       marginRight: '12px'
                     }}>
                       <FontAwesomeIcon icon={faUser} style={{ fontSize: '25px' }} color='white' cursor={'pointer'}
                         onClick={toggleProfil}/>
                     </div>
                </div>
            </header>
         <div className="section">
           
              <section id="Apropos">
                <div className='fonctionaliteStudent'>
                    <div className='documentStudent' onClick={() => setActiveTab('documents')}>
                        <FontAwesomeIcon icon={faFolderClosed} fontSize={'20px'}/>
                        <p>Mes documents</p>
                    </div>
                    <div className='corbeilleStudent' onClick={() => setActiveTab('corbeille')}>
                        <FontAwesomeIcon icon={faTrashCan} fontSize={'20px'}/>
                        <p>Corbeille</p>
                    </div>
                    <div className='chatStudent' onClick={() => setActiveTab('achats')}>
                        <FontAwesomeIcon icon={faCommentsDollar} fontSize={'20px'}/>
                        <p>achats et Paramètres</p>
                    </div>
                </div>

                <div>
                  <p style={{ 
                        fontFamily: 'Arial, sans-serif', 
                        fontSize: '18px', 
                        color: '#636e72',
                        fontStyle: 'italic'
                        }}>
                        Avec <span style={{ fontSize: '1.3rem',fontWeight:'bold', color: '#1da1f2' }}>
                        Plagify</span>, 
                        vous soutenez l'intégrité académique.
                  </p>
                </div>
                </section>
                
           </div>
             <main className="menu-principale">
              {activeTab === 'documents' && (<DocumentStudent/>)}
                 {activeTab === 'corbeille' && (<CorbeilleStudent/>)}
                     {activeTab === 'achats' && (<SettingStudent/> )}
              </main>
              <aside>
            
              </aside>
    
               <footer>
               </footer>
             </div>
          
              <ModalProfilStudent
               isProfilOpen={isProfilOpen}
               toggleProfil={toggleProfil}
               />
              <ModaleNotif
                isNotifOpen={isNotifOpen}
                setIsNotifOpen={setIsNotifOpen}
              />
              <ModaleHelp
               isHelpOpen={isHelpOpen}
               setIsHelpOpen={setIsHelpOpen}
              />
        </>
}

export default Student;