import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faUserTie} from '@fortawesome/free-solid-svg-icons';
import { faGoogle} from '@fortawesome/free-brands-svg-icons';


import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './inscription.css'
import ButtonLangue from '../components/ButtonLangue';
import Logo from '../images/logo.png'


function Inscription() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profil, setProfil] = useState('etudiant')
  const [password, setPassword] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)


const handleSignUp = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message); // On garde l'alert pour l'erreur pour l'instant
    setLoading(false);
    return;
  }

  if (data?.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id, full_name: name, profession: profil, email: email }]);

    if (!profileError) {
      setLoading(false);
      setShowModal(true); // ON AFFICHE LA MODALE DE SUCCÈS ICI
    }
  }
};
    return <>
              <div>
              <header>
                 <div style={{display:'flex', justifyContent:'center',alignItems:'center', margin:'0px 20px'}} className="header-left">
                   <Link to="/"><img src={Logo} alt="Logo" className="logoimgApp" /></Link>
                   <h2 className="logotextApp">Anti-plagiat</h2>
                 </div>
                 <div className='divUser'>
                    <ButtonLangue/>
                 </div>
              </header>

                <div className='FormuRegister'>
                <div className='containerform'>
                  <form action="" onSubmit={handleSignUp}>
                    <div style={styles.label}>
                      <label>Nom</label>
                    </div>
                    <div style={{position:'relative'}}>
                      <FontAwesomeIcon icon={faUser} style={styles.Icon}/>
                      <input type="text" 
                      onChange={(e)=> setName(e.target.value)}
                      placeholder='Name...'/>
                    </div>
                    <div style={styles.label}>
                      <label>Email</label>
                    </div>
                    <div style={{position:'relative'}}>
                      <FontAwesomeIcon icon={faEnvelope} style={styles.Icon}/>
                      <input type="email" 
                      onChange={(e)=> setEmail(e.target.value)}
                      placeholder='Email...'/>
                    </div>
                    <div style={styles.label}>
                      <label>Profil</label>
                    </div>
                    <div style={{position:'relative'}}>
                      <FontAwesomeIcon icon={faUserTie} style={styles.Icon}/>
                      <select name="profil" onChange={(e) => setProfil(e.target.value)} >
                      <option value="etudiant">Etudiant</option>
                      <option value="enseignant">Enseignant</option>
                    </select>
                    </div>
                    <div style={styles.label}>
                      <label>Mot de passe</label>
                    </div>
                    <div style={{position:'relative'}}>
                      <FontAwesomeIcon icon={faLock} style={styles.Icon}/>
                      <input type="password" 
                      onChange={(e)=> setPassword(e.target.value)}
                      placeholder='password...'/>
                    </div>
                    <button 
                      type='submit' 
                      disabled={loading} 
                      className={loading ? 'btn-disabled' : 'btn-active'}>
                      {loading ? "Vérification..." : "S'inscrire"}
                    </button>
                    <p style={{cursor: 'pointer', color:'blue',marginRight:'5px'}}><FontAwesomeIcon icon={faGoogle} style={styles.Google}/>Continuer avec Google</p>
                  </form>
                </div>
              </div>
              </div>

              {showModal && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="success-icon">✓</div>
                    <h3>Inscription réussie !</h3>
                    <p>Un email de confirmation a été envoyé à <strong>{email}</strong>.</p>
                    <p>Veuillez confirmer votre compte pour vous connecter.</p>
                    <Link to ='/connexion'>
                      <button className="btn-modal">Aller à la page de connexion</button>
                    </Link>
                  </div>
                </div>
              )}
            </>
}
const styles = {
  label:{
    display:'flex',
    paddingLeft:'8px',
    textShadow:'5px 5px 5px rgba(0,0,0,0.6)',
    fontWeight:'bold'
  },
  Icon:{
    color:'#545454',
    position:'absolute',
    marginTop:'15px',
    marginLeft:'10px'
  },
  Google:{
    color:'#4285F4',
    fontSize:'20px',
    paddingLeft:'10px'
  }

}
export default Inscription;