
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './screens/home' 
import Header from './components/Header';
import Student from './screens/Student';
import Teacher from './screens/Teacher';
import Admin from './screens/Admin';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/student" element={<Student/>}/>
        <Route path="/teacher" element={<Teacher/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>

      </Router>
    </div>
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
