import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faEnvelope, faLock, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { supabase } from '../supabaseClient';

import ButtonLangue from '../components/ButtonLangue';
import Logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './inscription.css'; // On réutilise le même CSS pour la cohérence

function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorModal, setErrorModal] = useState({ show: false, message: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setErrorModal({ show: true, message: error.message });
            setLoading(false);
        } else {
            console.log("Utilisateur connecté :", data.user);
            navigate('/student'); 
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
                    <form onSubmit={handleLogin}>
                        <h2 className="form-title">Bon retour !</h2>
                        <p className="form-subtitle">Connectez-vous pour accéder à vos analyses.</p>

                        <div className="input-block">
                            <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                            <input 
                                type="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='email@exemple.com' 
                                required 
                            />
                        </div>

                        <div className="input-block">
                            <label><FontAwesomeIcon icon={faLock} /> Mot de passe</label>
                            <input 
                                type="password" 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='••••••••' 
                                required 
                            />
                        </div>

                        <button type="submit" disabled={loading} className={loading ? 'btn-disabled' : 'btn-active'}>
                            {loading ? (
                                <><FontAwesomeIcon icon={faLockOpen} spin /> Connexion...</>
                            ) : (
                                "Se connecter"
                            )}
                        </button>

                        <div className="google-divider">
                            <span>ou</span>
                        </div>

                        <button type="button" className="btn-google">
                            <FontAwesomeIcon icon={faGoogle} /> Continuer avec Google
                        </button>

                        <p className="auth-switch">Pas de compte ? <Link to='/inscription'>S'inscrire gratuitement</Link></p>
                    </form>
                </div>
            </div>

            {/* MODALE D'ERREUR */}
            {errorModal.show && (
                <div className="modal-overlay">
                    <div className="modal-content animate-pop">
                        <div className="modal-icon error">
                            <FontAwesomeIcon icon={faCircleExclamation} />
                        </div>
                        <h3>Erreur de connexion</h3>
                        <p>{errorModal.message}</p>
                        <button 
                            onClick={() => setErrorModal({ show: false, message: '' })} 
                            className="btn-modal-secondary">
                            Réessayer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Connexion;