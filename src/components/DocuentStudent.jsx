import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCloudArrowUp, 
    faFileLines, 
    faXmark, 
    faFolderOpen, 
    faSpinner,
    faMagnifyingGlassChart,
    faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/DocumentStudent.css';
import HistoryStudent from './HistoryStudent';

function DocumentStudent({ user }) {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentAnalysisId, setCurrentAnalysisId] = useState(null);
    const [analysisStatus, setAnalysisStatus] = useState('idle');
    const [history, setHistory] = useState([]);
    const [globalScore, setGlobalScore] = useState(0);
    const [reportPath, setReportPath] = useState(null); // Nouveau : stocke le chemin du PDF

    const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
    const handleDragLeave = () => setDragging(false);
    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") setFile(droppedFile);
    };

    const handleUpload = async () => {
        if (!file || !user) return;
        if (file.size > 15 * 1024 * 1024) {
            alert("⚠️ Fichier trop volumineux pour mobile (Max 15 Mo).");
            return;
        }

        setLoading(true);
        setGlobalScore(0);
        setAnalysisStatus('Initialisation...');

        try {
            const cleanFileName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9.]/g, "_");
            const filePath = `${user.id}/${Date.now()}_${cleanFileName}`;

            const { error: uploadError } = await supabase.storage
                .from('fichiers_plagiat')
                .upload(filePath, file, { cacheControl: '3600', upsert: false, duplex: 'half' });

            if (uploadError) throw uploadError;

            const { data: analysisData, error: dbError } = await supabase
                .from('analyses')
                .insert([{ 
                    user_id: user.id, 
                    file_name: file.name, 
                    file_path: filePath, 
                    status: 'En attente...',
                    progress: 10
                }])
                .select().single();

            if (dbError) throw dbError;
            setCurrentAnalysisId(analysisData.id);

            const response = await fetch(`https://back-end-antiplagiat.onrender.com/start-analysis/${analysisData.id}`, { method: 'POST' });
            if (!response.ok) throw new Error("Serveur occupé");

        } catch (error) {
            alert(`❌ Erreur : ${error.message}`);
            setAnalysisStatus('idle');
            setLoading(false);
        }
    };

    const fetchHistory = async () => {
        if (!user) return;
        const { data, error } = await supabase.from('analyses').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (!error) setHistory(data);
    };

    const downloadReport = async (path) => {
        if (!path) return alert("Rapport indisponible");
        const { data } = supabase.storage.from('fichiers_plagiat').getPublicUrl(path);
        window.open(data.publicUrl, '_blank');
    };

    // --- TEMPS RÉEL : UNIQUE ET OPTIMISÉ ---
    // --- TEMPS RÉEL : UNIQUE ET OPTIMISÉ ---
    useEffect(() => {
        if (!currentAnalysisId) return;

        const channel = supabase
            .channel(`analysis-${currentAnalysisId}`)
            .on('postgres_changes', 
                { event: 'UPDATE', schema: 'public', table: 'analyses', filter: `id=eq.${currentAnalysisId}` },
                (payload) => {
                    const { status, progress, plagiarism_score, report_path } = payload.new;
                    
                    // 1. GESTION DE L'ERREUR
                    if (status === 'erreur') {
                        setAnalysisStatus('idle');
                        setLoading(false);
                        setCurrentAnalysisId(null);
                        alert("❌ Désolé, une erreur technique est survenue sur le serveur. Veuillez vérifier votre fichier et réessayer.");
                        return;
                    }

                    // 2. MISE À JOUR CLASSIQUE
                    setAnalysisStatus(status);
                    setGlobalScore(progress); 

                    // 3. FINALISATION
                    if (status === 'termine' || progress === 100) {
                        setGlobalScore(plagiarism_score);
                        setReportPath(report_path);
                        setAnalysisStatus('completed');
                        setLoading(false);
                        fetchHistory();
                    }
                }
            ).subscribe();

        return () => supabase.removeChannel(channel);
    }, [currentAnalysisId]);;

    useEffect(() => { fetchHistory(); }, [user]);

    return (
        <div className="document-student-wrapper">
            <div className="page-header">
                <h2><FontAwesomeIcon icon={faFolderOpen} /> Mes documents</h2>
                <p>Analysez vos travaux et consultez vos rapports d'intégrité.</p>
            </div>
            
            {analysisStatus === 'completed' ? (
                <div className="report-view-container animate-fade-in">
                    <div className="report-card">
                        <div className="report-header">
                            <div className="score-badge" style={{ backgroundColor: globalScore > 20 ? '#fff1f0' : '#f6ffed' }}>
                                <h3 style={{ color: globalScore > 20 ? '#cf1322' : '#389e0d' }}>{globalScore}%</h3>
                                <span>Plagiat détecté</span>
                            </div>
                            <div className="report-actions">
                                {/* BOUTON DE TÉLÉCHARGEMENT DU VRAI PDF PYTHON */}
                                <button onClick={() => downloadReport(reportPath)} className="btn-pdf">
                                    <FontAwesomeIcon icon={faFilePdf} /> Rapport IA
                                </button>
                                <button onClick={() => { setAnalysisStatus('idle'); setFile(null); }} className="btn-close-report">
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                        </div>
                        {/* Liste des sources ici... */}
                    </div>
                </div>
            ) : (
                <div className="dashboard-grid">
                    <div className="main-card upload-section">
                        <div className="card-title">
                            <FontAwesomeIcon icon={faMagnifyingGlassChart} />
                            <h3>Nouvelle Analyse</h3>
                        </div>
                        
                        <div className={`drop-box ${dragging ? 'dragging' : ''} ${file ? 'selected' : ''}`}
                             onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                            {!file ? (
                                <div className="drop-ui">
                                    <FontAwesomeIcon icon={faCloudArrowUp} className="upload-icon-anim" />
                                    <p>Glissez votre PDF ici ou</p>
                                    <label htmlFor="fileInput" className="label-browse">Parcourir</label>
                                    <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} id="fileInput" hidden />
                                </div>
                            ) : (
                                <div className="file-ui">
                                   <FontAwesomeIcon icon={faFileLines} className="file-icon-selected" />
                                    <div className="file-info-truncated">
                                       {/* On ajoute title pour voir le nom complet au survol */}
                                       <span className="name-file" title={file.name}>
                                           {file.name}
                                       </span>
                                       <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} Mo)</span>
                                    </div>
                                      <button onClick={() => setFile(null)} className="btn-remove">
                                       <FontAwesomeIcon icon={faXmark} />
                                      </button>
                               </div>
                            )}
                        </div>

                        {file && !loading && (
                            <button onClick={handleUpload} className="btn-launch">Lancer l'analyse</button>
                        )}

                        {loading && (
                            <div className="loader-status">
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <p>{analysisStatus}</p>
                                {/* BARRE DE PROGRESSION VISUELLE */}
                                <div className="progress-bar-container">
                                    <div className="progress-bar-fill" style={{ width: `${globalScore}%` }}></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="main-card history-section-card">
                        <HistoryStudent 
                            history={history}
                            setHistory={setHistory}
                            onSelectAnalysis={(id) => { setCurrentAnalysisId(id); setLoading(true); }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DocumentStudent;