import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/home";
import Pertinence from "./screens/Pertinence";
import Student from "./screens/Student";
import Teacher from "./screens/Teacher";
import Admin from "./screens/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/pertinence" element={<Pertinence />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
