import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faCircleQuestion, faFolderClosed, faTrashCan, faCommentsDollar,faFolderOpen} 
                from '@fortawesome/free-solid-svg-icons';
import '../Styles/Admin.css'
import Logo from '../images/logo.png'
function Admin(){
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
                <div className='divAdmin'>
                    <select name="langue" id="">
                        <option value="francais">francais</option>
                        <option value="francais">Anglais</option>
                    </select>
                    <FontAwesomeIcon icon={faCircleQuestion} fontSize={'25px'} />
                    <FontAwesomeIcon icon={faBell} fontSize={'25px'} cursor={'pointer'}/>
                    <div style={{borderRadius:'50%', backgroundColor:'#9f9ea9ff', width:'40px',height:'40px'}}>
                        <FontAwesomeIcon icon={faUser} fontSize={'30px'} cursor={'pointer'}/>
                    </div>
                </div>
            </header>
         <div class="section">
           
              <section id="Apropos">
               <h2 >À propos de moi</h2>
                <div className='fonctionaliteAdmin'>
                    <div className='documentAdmin'>
                        <FontAwesomeIcon icon={faFolderClosed} fontSize={'20px'}/>
                        <p>Mes documents</p>
                    </div>
                    <div className='corbeilleAdmin'>
                        <FontAwesomeIcon icon={faTrashCan} fontSize={'20px'}/>
                        <p>Corbeille</p>
                    </div>
                    <div className='chatAdmin'>
                        <FontAwesomeIcon icon={faCommentsDollar} fontSize={'20px'}/>
                        <p>Chats</p>
                    </div>
                </div>
                </section>
                
         </div>
        <main class="menu-principale">
            <h2><FontAwesomeIcon icon={faFolderOpen} />Dashboard Admin</h2>
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
export default Admin;