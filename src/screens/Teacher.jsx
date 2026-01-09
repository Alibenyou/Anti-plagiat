import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faCircleQuestion, faFolderClosed, faTrashCan, faCommentsDollar,faFolderOpen} 
                from '@fortawesome/free-solid-svg-icons';
import '../Styles/Teacher.css'
import Logo from '../images/logo.png'
function Teacher(){
    return  <>
        <div class="container">
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
                    <select name="langue" id="">
                        <option value="francais">francais</option>
                        <option value="francais">Anglais</option>
                    </select>
                    <FontAwesomeIcon icon={faCircleQuestion} fontSize={'25px'} />
                    <FontAwesomeIcon icon={faBell} fontSize={'25px'} cursor={'pointer'}/>
                    <div style={{
                        borderRadius: '50%', 
                        backgroundColor: '#9f9ea9ff', 
                        width: '50px', height: '50px',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', // Centrage parfait
                        marginRight: '12px'
                        }}>
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '25px' }} color='white'cursor={'pointer'} />
                    </div>
                </div>
            </header>
         <div class="section">
           
              <section id="Apropos">
               <h2 >À propos de moi</h2>
                <div className='fonctionaliteTeacher'>
                    <div className='documentTeacher'>
                        <FontAwesomeIcon icon={faFolderClosed} fontSize={'20px'}/>
                        <p>Mes documents</p>
                    </div>
                    <div className='corbeilleTeacher'>
                        <FontAwesomeIcon icon={faTrashCan} fontSize={'20px'}/>
                        <p>Corbeille</p>
                    </div>
                    <div className='chatTeacher'>
                        <FontAwesomeIcon icon={faCommentsDollar} fontSize={'20px'}/>
                        <p>Chats</p>
                    </div>
                </div>
                </section>
                
         </div>
        <main class="menu-principale">
            <h2><FontAwesomeIcon icon={faFolderOpen} />Mes documents</h2>
            <button>Ajouter des documents</button>
        </main>
        <aside>
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
        </aside>
        
         <footer>
            <hr />
            
         </footer>
       </div>
            </>
           
}
export default Teacher;