import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function ModaleNotif({
     userId,
     isNotifOpen,
     setIsNotifOpen
}){

  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    // 1. Charger les notifications existantes
    fetchNotifications();

    // 2. Écouter les nouvelles notifications en TEMPS RÉEL
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('Nouvelle notification reçue !', payload.new);
          setNotifications((prev) => [payload.new, ...prev]);
          setHasUnread(true);
          // Optionnel : Jouer un petit son de notification ici
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId]);

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) {
      setNotifications(data);
      setHasUnread(data.some(n => !n.is_read));
    }
  };
  return <>

        {isNotifOpen && (
        <div style={{ ...styles.overlay, right: '80px', width: '320px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Notifications ({notifications.length})</h3>
            <span 
              onClick={() => {/* Logique pour marquer comme lu en DB */}}
              style={{ fontSize: '12px', color: '#1205cf', cursor: 'pointer' }}
            >
              Tout marquer comme lu
            </span>
          </div>
          <hr style={styles.separator} />
          
          <div style={{ ...styles.menuList, maxHeight: '400px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
                Aucune notification pour le moment.
              </p>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} style={{
                  ...styles.notifItem, 
                  borderLeft: notif.is_read ? '4px solid #e2e8f0' : '4px solid #1205cf',
                  opacity: notif.is_read ? 0.7 : 1
                }}>
                  <p style={{ margin: 0, fontSize: '13px', color: '#1e293b' }}>
                    {notif.title}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '12px', color: '#64748b' }}>
                    {notif.message}
                  </p>
                  <span style={{ fontSize: '10px', color: '#b2bec3' }}>
                    {new Date(notif.created_at).toLocaleDateString()} {new Date(notif.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              ))
            )}
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