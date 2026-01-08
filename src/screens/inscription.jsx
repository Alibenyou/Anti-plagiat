import { MdEmail } from 'react-icons/md';
import './inscription.css'
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff, MdLock , MdPerson} from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { Link } from 'react-router-dom';


function Inscription() {

 const [showPassword, setShowPassword] = useState(false);

const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("etudiant");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });

    // vérifier si tout va bien
    if (!response.ok) {
      const text = await response.text();  // récupère texte brut pour debug
      throw new Error(`Erreur serveur : ${text}`);
    }

    const data = await response.json();  // maintenant ça devrait marcher
    alert(data.message);

  } catch (err) {
    alert(err.message);
    console.error(err);
  }
};


    return ( 
    <div className='inscription'>
      <div className='menu'>
        <p>Anti-Plagiat</p>
        <div className='gue'>
        <MdLanguage title='' className='langue'/>
        <select name="langue" id="" className='lang'>
         
          <option value="">Francais</option>
          <option value="">Anglais</option>
          <option value="">Arabe</option>
        </select>
      </div>
      </div>
<div class='divp'>
  <div className='tr'>
     <form action="" onSubmit={handleSubmit}>
<div className='google'>
    <button style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginLeft: "45px",
      padding: "12px 20px",
      borderRadius: "6px",
      border: "0px solid #ddd",
      backgroundColor: "#fff",
      cursor: "pointer",
      fontSize: "16px"
    }}>
      <FcGoogle size={22} />
      Continuer avec Google
      
    </button>
    </div>
    <div className='mail'>
<MdEmail className='ico_mail'/>
 <input type="email"  MdEmail className='inp' placeholder='Email' value={email}
  onChange={(e) => setEmail(e.target.value)}  />
</div>

<div className="input-password">
       <MdLock className="cadena" />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className="icon" onClick={togglePassword}>
        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
      </span>
    </div>

  <div className='sel'>
<MdPerson className='ico_mail'/>
 <select name='Rôle' className='cel' placeholder='Rôle'  value={role}
  onChange={(e) => setRole(e.target.value)} >
    <option className='option' value="etudiant"> Etudiant</option>
    <option className='option' value="enseignant">Enseignant</option>
</select>
</div>

<div className='bou'>
    <button className='but' type="submit">S'inscrire</button>
</div>

<div className='con'>
<p>déja un compte ?     <Link to="/login"> <button className='ton'>Se Connecter</button> </Link></p>
</div>

<div className='po'>
<p className='tex'>En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.</p>
</div>

     </form>

</div>
</div>
</div>
    );
}
export default Inscription;