import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faTrashCan, faEye, faClock } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient';
import '../Styles/SettingStudent.css'; // Assure-toi que les styles ci-dessous y sont

function HistoryStudent({
  setCurrentAnalysisId,
  setAnalysisStatus,
  fetchResults,
  history,
  setHistory, // On ajoute setHistory pour mettre à jour la liste après suppression
  setGlobalScore
}) {

  // Fonction pour supprimer une analyse
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Empêche de déclencher le "Voir le rapport"
    if (!window.confirm("Voulez-vous vraiment supprimer cette analyse ?")) return;

    try {
      const { error } = await supabase.from('analyses').delete().eq('id', id);
      if (error) throw error;
      
      // Mise à jour locale de l'état pour que l'item disparaisse immédiatement
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error("Erreur suppression:", error.message);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="history-section">
          
      <div className="history-header">
        <h3><FontAwesomeIcon icon={faClock} /> Historique des analyses</h3>
        <span className="history-count">{history.length} document(s)</span>
      </div>

      <div className="history-list">
        {history.length === 0 ? (
          <div className="empty-history">
            <FontAwesomeIcon icon={faFileLines} size="2x" />
            <p>Aucune analyse effectuée pour le moment.</p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-info">
                <span className="history-name">{item.file_name}</span>
                <span className="history-date">
                  {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.created_at))}
                </span>
              </div>

              <div className="history-actions">
                <div className="history-score" style={{ color: item.plagiarism_score > 20 ? '#e74c3c' : '#2ecc71' }}>
                  {item.plagiarism_score}%
                </div>
                
                <button 
                  onClick={() => {
                    setCurrentAnalysisId(item.id);
                    setGlobalScore(item.plagiarism_score); // <--- FORCE la mise à jour du score
                    setAnalysisStatus('completed');
                    fetchResults(item.id);
                  }} 
                  className="view-btn"
                  title="Voir le rapport"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                    
                <button 
                  onClick={(e) => handleDelete(e, item.id)} 
                  className="delete-btn"
                  title="Supprimer"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryStudent;