import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faUserTie, faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './inscription.css';
import ButtonLangue from '../components/ButtonLangue';
import Logo from '../images/logo.png';

function Inscription() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profil, setProfil] = useState('etudiant');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    // États pour les modales
    const [modalConfig, setModalConfig] = useState({ show: false, type: 'success', message: '' });

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setModalConfig({ show: true, type: 'error', message: error.message });
            setLoading(false);
            return;
        }

        if (data?.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: data.user.id, full_name: name, profession: profil, email: email }]);

            if (!profileError) {
                setLoading(false);
                setModalConfig({ 
                    show: true, 
                    type: 'success', 
                    message: `Un email de confirmation a été envoyé à ${email}.` 
                });
            } else {
                setModalConfig({ show: true, type: 'error', message: "Erreur lors de la création du profil." });
                setLoading(false);
            }
        }
    };

    return (
        <div className="auth-page-wrapper">
            <header className="header-auth">
                <div className="header-left">
                    <Link to="/"><img src={Logo} alt="Logo" className="logoimgApp" /></Link>
                    <h2 className="logotextApp">Anti-plagiat</h2>
                </div>
                <div className='divUser'>
                    <ButtonLangue />
                </div>
            </header>

            <div className='FormuRegister'>
                <div className='containerform'>
                    <form onSubmit={handleSignUp}>
                        <h2 className="form-title">Créer un compte</h2>
                        
                        <div className="input-block">
                            <label><FontAwesomeIcon icon={faUser} /> Nom</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Votre nom complet' required />
                        </div>

                        <div className="input-block">
                            <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='email@exemple.com' required />
                        </div>

                        <div className="input-block">
                            <label><FontAwesomeIcon icon={faUserTie} /> Profil</label>
                            <select onChange={(e) => setProfil(e.target.value)}>
                                <option value="etudiant">Étudiant</option>
                                <option value="enseignant">Enseignant</option>
                            </select>
                        </div>

                        <div className="input-block">
                            <label><FontAwesomeIcon icon={faLock} /> Mot de passe</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='••••••••' required />
                        </div>

                        <button type='submit' disabled={loading} className={loading ? 'btn-disabled' : 'btn-active'}>
                            {loading ? "Vérification..." : "S'inscrire"}
                        </button>

                        <div className="google-divider">
                            <span>ou</span>
                        </div>

                        <button type="button" className="btn-google">
                            <FontAwesomeIcon icon={faGoogle} /> Continuer avec Google
                        </button>
                        
                        <p className="auth-switch">Déjà inscrit ? <Link to="/connexion">Se connecter</Link></p>
                    </form>
                </div>
            </div>

            {/* MODALE UNIQUE (SUCCESS OU ERROR) */}
            {modalConfig.show && (
                <div className="modal-overlay">
                    <div className="modal-content animate-pop">
                        <div className={`modal-icon ${modalConfig.type}`}>
                            <FontAwesomeIcon icon={modalConfig.type === 'success' ? faCircleCheck : faCircleExclamation} />
                        </div>
                        <h3>{modalConfig.type === 'success' ? 'Félicitations !' : 'Oups !'}</h3>
                        <p>{modalConfig.message}</p>
                        
                        {modalConfig.type === 'success' ? (
                            <Link to='/connexion'><button className="btn-modal-primary">Aller à la connexion</button></Link>
                        ) : (
                            <button onClick={() => setModalConfig({ ...modalConfig, show: false })} className="btn-modal-secondary">Réessayer</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inscription;