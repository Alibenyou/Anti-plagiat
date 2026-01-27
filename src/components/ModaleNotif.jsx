function ModaleNotif({
     isNotifOpen,
     setIsNotifOpen
}){
        return<>
                {isNotifOpen && (
              <div style={{ ...styles.overlay, right: '80px', width: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Notifications</h3>
                  <span style={{ fontSize: '12px', color: '#1da1f2', cursor: 'pointer' }}>Tout marquer comme lu</span>
                </div>
                <hr style={styles.separator} />
                <div style={styles.menuList}>
                  <div style={styles.notifItem}>
                    <p style={{ margin: 0, fontSize: '13px' }}>✅ Votre fichier <strong>"Rapport.pdf"</strong> a été analysé avec succès.</p>
                    <span style={{ fontSize: '10px', color: '#b2bec3' }}>Il y a 2 min</span>
                  </div>
                  <div style={styles.notifItem}>
                    <p style={{ margin: 0, fontSize: '13px' }}>⚠️ Attention : Taux de plagiat élevé détecté sur <strong>"Thèse_V1"</strong>.</p>
                    <span style={{ fontSize: '10px', color: '#b2bec3' }}>Il y a 1 heure</span>
                  </div>
                </div>
                <button onClick={() => setIsNotifOpen(false)} style={styles.closeBtn}>Fermer</button>
              </div>
            )}
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
  notifItem: {
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    marginBottom: '5px',
    borderLeft: '4px solid #1da1f2',
  },
}
export default ModaleNotif;