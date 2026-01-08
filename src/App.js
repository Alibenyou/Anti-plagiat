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
  );
}

export default App;
