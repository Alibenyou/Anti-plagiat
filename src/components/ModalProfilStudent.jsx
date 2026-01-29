import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';

function ModalProfilStudent({
    user,
    handleLogout,
    isProfilOpen,
    toggleProfil,
}){
    return <>
            <div style={{ padding: '20px' }}>
  
        {isProfilOpen && (
          <div style={styles.overlay}>
            {/* Section Profil */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                     <div style={{
                       borderRadius: '50%', 
                       backgroundColor: '#9f9ea9ff', 
                       width: '50px', height: '50px',
                       display: 'flex', justifyContent: 'center', alignItems: 'center',
                       marginRight: '12px'
                     }}>
                       <FontAwesomeIcon icon={faUser} style={{ fontSize: '25px' }} color='white' />
                     </div>
                    <div style={{ fontSize: '14px', lineHeight: '1.2' }}>
                      <p style={{ margin: 0 }}><strong>{user.full_name}</strong></p>
                      <p style={{ margin: 0, color: '#636e72', fontSize: '12px' }}>{user.email}</p>
                    </div>
            </div>
                  <hr style={styles.separator} />

                  {/* Section Actions */}
                  <div style={styles.menuList}>
                    <p style={styles.menuItem}>Paramètres</p>
                    <p style={{ ...styles.menuItem, color: '#e74c3c' }} onClick={handleLogout}
                    >Déconnexion</p>
                  </div>

                  <hr style={styles.separator} />

                  {/* Section Infos */}
                  <div style={styles.menuList}>
                    <p style={styles.menuItem}>Guide d'utilisation</p>
                    <p style={styles.menuItem}>Aide</p>
                    <p style={styles.menuItem}>Politique de confidentialité</p>
                  </div>

                  <button onClick={toggleProfil} style={styles.closeBtn}>Fermer</button>
                </div>
              )}
             </div>
           </>
}
const styles = {
  overlay: {
    position: 'fixed',
    top: '70px', 
    right: '20px', // Calé à droite avec une petite marge
    backgroundColor: 'white',
    width: '250px', // Un peu plus large pour le texte
    zIndex: 1000,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #eee'
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  menuItem: {
    margin: 0,
    cursor: 'pointer',
    fontSize: '14px',
    color: '#2d3436',
    padding: '5px 0'
  },
  separator: {
    border: 0,
    borderTop: '1px solid #f1f1f1',
    margin: '15px 0'
  },
  closeBtn: {
    marginTop: '15px',
    width: '100%',
    padding: '8px',
    cursor: 'pointer',
    backgroundColor: '#f1f2f6',
    color: '#2d3436',
    border: 'none',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
};
export default ModalProfilStudent;