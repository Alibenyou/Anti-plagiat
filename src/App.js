
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inscription from './screens/inscription';
import Connexion from './screens/connexion';
import Home from './screens/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Connexion />} /> {/* par défaut */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
