import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inscription from './screens/inscription';
import Connexion from './screens/connexion';
import './App.css';
import Home from './screens/home' 
import Student from './screens/Student';
import Teacher from './screens/Teacher';
import Admin from './screens/Admin';
import Pertinence from './screens/Pertinence';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pertinence" element={<Pertinence/>}/>
        <Route path="/student" element={<Student/>}/>
        <Route path="/teacher" element={<Teacher/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
