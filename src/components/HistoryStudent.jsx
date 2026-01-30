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
  setGlobalScore,
  setReportPath
}) {

  // Fonction pour supprimer une analyse

const handleDelete = async (e, id) => {
  e.stopPropagation();
  if (!window.confirm("Voulez-vous vraiment supprimer cette analyse définitivement ?")) return;

  try {
    // On demande explicitement la réponse pour vérifier si une ligne a été touchée
    const { error, count } = await supabase
      .from('analyses')
      .delete()
      .eq('id', id)
      .select(); // Le .select() force Supabase à confirmer l'action

    if (error) throw error;

    console.log(`Suppression réussie pour l'ID: ${id}`);
    
    // Mise à jour de l'état local
    setHistory(prevHistory => prevHistory.filter(item => item.id !== id));

  } catch (error) {
    console.error("Erreur suppression détaillée:", error);
    alert(`Erreur : ${error.message || "Problème de connexion à la base de données"}`);
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
                    setGlobalScore(item.plagiarism_score); 
                    setReportPath(item.report_path); // <--- AJOUTE CETTE LIGNE : transmet le PDF au parent
                    setAnalysisStatus('completed');
                    if(fetchResults) fetchResults(item.id); // Sécurité si fetchResults est défini
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