import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen,faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import { faGoogle} from '@fortawesome/free-brands-svg-icons';
import { supabase } from '../supabaseClient';

import ButtonLangue from '../components/ButtonLangue';
import Logo from '../images/logo.png'
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './inscription.css';

function Connexion() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
          e.preventDefault();
          setLoading(true);

          // On demande à Supabase de vérifier les identifiants
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
            });
        
          if (error) {
            alert("Erreur : " + error.message);
            setLoading(false);
            } else {
            // Si ça marche, Supabase crée une session dans le navigateur
            console.log("Utilisateur connecté :", data.user);
            navigate('/student'); // Direction le tableau de bord !
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
                  <form action="" onSubmit={handleLogin}>
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
                    <label>Mot de passe</label>
                    </div>
                    <div style={{position:'relative'}}>
                      <FontAwesomeIcon icon={faLock} style={styles.Icon}/>
                      <input type="password" 
                      onChange={(e)=> setPassword(e.target.value)}
                      placeholder='password...'/>
                    </div>
                    <button type="submit" disabled={loading}>
                      {loading ? (
                        <><FontAwesomeIcon icon={faLockOpen} /> Connexion...</>
                      ) : (
                        "Se connecter"
                      )}
                    </button>
                    <p style={{cursor: 'pointer', color:'blue',marginRight:'5px'}}>
                      <FontAwesomeIcon icon={faGoogle} style={styles.Google}/>
                      Continuer avec Google</p>

                      <p>Pas compte ? <Link to = '/inscription'>s'inscrire</Link></p>
                  </form>
                </div>
              </div>
              </div>
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
export default Connexion;
