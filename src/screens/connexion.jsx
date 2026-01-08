import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './inscription.css'; // on réutilise le même CSS que Inscription

function Connexion() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/home"); // redirection vers Home.jsx
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Erreur serveur !");
    }
  };

  return (
    <div className='inscription'>
      <div className='menu'>
        <p>Anti-Plagiat</p>
      </div>

      <div className='divp'>
        <div className='tr'>
          <form onSubmit={handleLogin}>
            <div className='mail'>
              <MdEmail className='ico_mail'/>
              <input
                type="email"
                className='inp'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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

            <div className='bou'>
              <button className='but' type="submit">Se connecter</button>
            </div>

            <div className='con'>
              <p>Pas encore de compte ? <button className='ton' onClick={() => navigate("/inscription")}>S'inscrire</button></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
