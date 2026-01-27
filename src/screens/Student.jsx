import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, faBell, faCircleQuestion, faTrashCan, 
    faCommentsDollar, faFolderOpen, faBars, faXmark 
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

import '../Styles/Student.css';
import Logo from '../images/logo.png';
import ModaleNotif from '../components/ModaleNotif';
import ModalProfilStudent from '../components/ModalProfilStudent';
import DocumentStudent from '../components/DocuentStudent';
import CorbeilleStudent from '../components/CorbeilleStudent';
import ModaleHelp from '../components/ModaleHelp';
import ButtonLangue from '../components/ButtonLangue';

function Student() {
    const [isProfilOpen, setIsProfilOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le Hamburger
    const [activeTab, setActiveTab] = useState('documents');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfil = () => { setIsProfilOpen(!isProfilOpen); setIsNotifOpen(false); setIsHelpOpen(false); };
    const toggleNotif = () => { setIsNotifOpen(!isNotifOpen); setIsProfilOpen(false); setIsHelpOpen(false); };
    const toggleHelp = () => { setIsHelpOpen(!isHelpOpen); setIsNotifOpen(false); setIsProfilOpen(false); };

    useEffect(() => {
        const getFullUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('full_name, email')
                    .eq('id', user.id)
                    .single();
                if (!error && profile) setUser({ ...user, full_name: profile.full_name });
            } else { navigate('/'); }
        };
        getFullUserData();
    }, [navigate]);

    const handleLogout = async () => { await supabase.auth.signOut(); navigate('/'); };

    if (!user) return <div className="loader-session">Chargement...</div>;

    return <>
        <div className="container">
            <header>
                <div className="header-left">
                    {/* Bouton Hamburger visible uniquement sur Mobile */}
                    <button className="hamburger-btn" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                    </button>
                    <img src={Logo} alt="Logo" className="logo-img" />
                    <h2 className="logo-text">Anti-plagiat</h2>
                </div>

                <div className="header-center">
                    <span className="file-count">200</span>
                    <p className="file-label">Nombre de fichiers</p>
                </div>

                <div className="divUser">
                    <ButtonLangue />
                    <FontAwesomeIcon icon={faCircleQuestion} className="header-icon" onClick={toggleHelp} />
                    <FontAwesomeIcon icon={faBell} className="header-icon" onClick={toggleNotif} />
                    <div className="user-avatar" onClick={toggleProfil}>
                        <FontAwesomeIcon icon={faUser} color="white" />
                    </div>
                </div>
            </header>

            <div className="content-layout">
                {/* La sidebar reçoit une classe "open" si le menu hamburger est actif */}
                <section className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                    <div className="fonctionaliteStudent">
                        <div className={`menu-item ${activeTab === 'documents' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('documents'); setIsMenuOpen(false); }}>
                            <FontAwesomeIcon icon={faFolderOpen} />
                            <p>Mes documents</p>
                        </div>

                        <div className={`menu-item ${activeTab === 'corbeille' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('corbeille'); setIsMenuOpen(false); }}>
                            <FontAwesomeIcon icon={faTrashCan} />
                            <p>Corbeille</p>
                        </div>

                        <div className={`menu-item ${activeTab === 'achats' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('achats'); setIsMenuOpen(false); }}>
                            <FontAwesomeIcon icon={faCommentsDollar} />
                            <p>Achats & Paramètres</p>
                        </div>
                    </div>

                    <div className="sidebar-footer">
                        <p>Avec <span>Plagify</span>, soutenez l'intégrité académique.</p>
                    </div>
                </section>

                {/* Overlay pour fermer le menu en cliquant à côté */}
                {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
            
                <main className="menu-principale">
                    {activeTab === 'documents' && <DocumentStudent user={user} />}
                    {activeTab === 'corbeille' && <CorbeilleStudent />}

                    
                </main>
            
            </div>
            
        </div>
        <ModalProfilStudent user={user} handleLogout={handleLogout} isProfilOpen={isProfilOpen} toggleProfil={toggleProfil} />
        <ModaleNotif isNotifOpen={isNotifOpen} setIsNotifOpen={setIsNotifOpen} />
        <ModaleHelp isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
    </>
}

export default Student;