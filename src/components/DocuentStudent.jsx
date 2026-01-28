import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCloudArrowUp, 
    faFileLines, 
    faXmark, 
    faFolderOpen, 
    faSpinner,
    faMagnifyingGlassChart
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/DocumentStudent.css';
import HistoryStudent from './HistoryStudent';

function DocumentStudent({ user }) {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [currentAnalysisId, setCurrentAnalysisId] = useState(null);
    const [analysisStatus, setAnalysisStatus] = useState('idle');
    const [history, setHistory] = useState([]);
    const [globalScore, setGlobalScore] = useState(0);

    useEffect(() => {
        if (results.length > 0) {
            const max = Math.max(...results.map(r => r.similarity_score));
            setGlobalScore(max);
        }
    }, [results]);

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
    setLoading(true);
    setResults([]);
    setGlobalScore(0);
    setAnalysisStatus('processing');

    try {
        // 1. Nettoyage du nom de fichier
        const cleanFileName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9.]/g, "_");
        const filePath = `${user.id}/${Date.now()}_${cleanFileName}`;

        // 2. Upload vers Supabase Storage
        const { error: uploadError } = await supabase.storage.from('fichiers_plagiat').upload(filePath, file);
        if (uploadError) throw uploadError;

        // 3. Création de l'entrée en base de données
        const { data: analysisData, error: dbError } = await supabase
            .from('analyses')
            .insert([{ 
                user_id: user.id, 
                file_name: file.name, 
                file_path: filePath, 
                status: 'traitement' 
            }])
            .select().single();

        if (dbError) throw dbError;
            
        setCurrentAnalysisId(analysisData.id);

        // 4. APPEL AU BACK-END (Correction de l'URL)
        const response = await fetch(`https://back-end-antiplagiat.onrender.com/start-analysis/${analysisData.id}`, { 
            method: 'POST' 
        });

        if (!response.ok) {
            throw new Error(`Erreur serveur: ${response.status}`);
        }

        console.log("Analyse lancée avec succès !");

    } catch (error) {
        console.error("Erreur détaillée:", error);
        alert("Une erreur est survenue lors du lancement de l'analyse.");
        setAnalysisStatus('idle');
        setLoading(false);
    }
};
    
    const fetchHistory = async () => {
        if (!user) return;
        const { data, error } = await supabase
            .from('analyses')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        if (!error) setHistory(data);
    };

    const fetchResults = async (analysisId) => {
        const { data, error } = await supabase
            .from('analysis_results')
            .select('*')
            .eq('analysis_id', analysisId);
        if (!error) setResults(data);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Rapport d'Analyse Anti-Plagiat", 20, 20);
        doc.text(`Score : ${globalScore}%`, 20, 30);
        autoTable(doc, {
            startY: 40,
            head: [['Source', 'Score', 'Lien']],
            body: results.map(r => [r.title || "Source Web", `${r.similarity_score}%`, r.url]),
        });
        doc.save(`Rapport_${file?.name || 'Analyse'}.pdf`);
    };

    useEffect(() => {
        if (!currentAnalysisId) return;
        const channel = supabase
            .channel(`results-${currentAnalysisId}`)
            .on('postgres_changes', 
                { event: 'INSERT', schema: 'public', table: 'analysis_results', filter: `analysis_id=eq.${currentAnalysisId}` },
                (payload) => { setResults((prev) => [payload.new, ...prev]); }
            ).subscribe();
        return () => supabase.removeChannel(channel);
    }, [currentAnalysisId]);

    useEffect(() => {
        if (!currentAnalysisId) return;
        const statusChannel = supabase
            .channel('status-updates')
            .on('postgres_changes', 
                { event: 'UPDATE', schema: 'public', table: 'analyses', filter: `id=eq.${currentAnalysisId}` },
                (payload) => {
                    if (payload.new.status === 'termine') {
                        setAnalysisStatus('completed');
                        setLoading(false);
                        fetchHistory();
                    }
                }
            ).subscribe();
        return () => supabase.removeChannel(statusChannel);
    }, [currentAnalysisId]);

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
                            <div className="score-badge" style={{ backgroundColor: globalScore > 20 ? '#fff1f0' : '#f6ffed', borderColor: globalScore > 20 ? '#ffa39e' : '#b7eb8f' }}>
                                <h3 style={{ color: globalScore > 20 ? '#cf1322' : '#389e0d' }}>{globalScore}%</h3>
                                <span>Score Global</span>
                            </div>
                            <div className="report-actions">
                                <button onClick={generatePDF} className="btn-pdf">📥 PDF</button>
                                <button onClick={() => { setAnalysisStatus('idle'); setFile(null); }} className="btn-close-report">
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                        </div>

                        <div className="sources-container">
                            <h4>Sources détectées ({results.length})</h4>
                            <div className="sources-scroll">
                                {results.map((r, i) => (
                                    <div key={i} className="source-item-mini">
                                        <div className="source-meta">
                                            <a href={r.url} target="_blank" rel="noreferrer">{r.title || "Lien Source"}</a>
                                            <span className="source-percent">{r.similarity_score}%</span>
                                        </div>
                                        <div className="source-progress"><div className="fill" style={{ width: `${r.similarity_score}%` }}></div></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="dashboard-grid">
                    {/* CARTE UPLOAD */}
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
                                    <FontAwesomeIcon icon={faFileLines} />
                                    <span className="name-file">{file.name}</span>
                                    <button onClick={() => setFile(null)} className="btn-remove"><FontAwesomeIcon icon={faXmark} /></button>
                                </div>
                            )}
                        </div>

                        {file && analysisStatus === 'idle' && (
                            <button onClick={handleUpload} className="btn-launch">Lancer l'analyse</button>
                        )}

                        {analysisStatus === 'processing' && (
                            <div className="loader-status">
                                <FontAwesomeIcon icon={faSpinner} spin />
                                <p>Analyse de l'IA en cours...</p>
                            </div>
                        )}
                    </div>

                    {/* CARTE HISTORIQUE (DÉTACHÉE) */}
                    <div className="main-card history-section-card">
                        <HistoryStudent 
                            setCurrentAnalysisId={setCurrentAnalysisId}
                            setAnalysisStatus={setAnalysisStatus}
                            fetchResults={fetchResults}
                            history={history}
                            setHistory={setHistory}
                            setGlobalScore={setGlobalScore}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DocumentStudent;